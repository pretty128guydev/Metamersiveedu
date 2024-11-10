import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    MenuFoldOutlined,
    DeleteFilled,
    MenuUnfoldOutlined,
    PictureOutlined,
    InfoOutlined,
    ExclamationOutlined,
    MinusOutlined,
    DribbbleOutlined,
    CheckCircleFilled,
    QuestionCircleFilled,
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import TagApi from '../../api-clients/TagApi';
import { typeOptions } from './TagQuestionUpload';
import { Upload, Form, InputNumber, Select, Input, Layout, Menu, Button, theme, Segmented, Space, notification, Spin, Modal } from 'antd';

import "./TagQuestionCheck.scss";
import useLanguageToggle from "../../hooks/useLanguageToggle";

const { Header, Sider, Content } = Layout;

const TagQuestionCheck = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [selectedTab, setSelectedTab] = useState("DRAFT");
  const [selectedKeys, setSelectedKeys] = useState(["pictures"]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPicList, setCurrentPicList] = useState([]);
  const [currentItem, setCurrentItem] = useState();
  const [data, setData] = useState([]);
  const { translate } = useLanguageToggle();

    const { internId } = useParams();

    const { token: { colorBgContainer } } = theme.useToken();

    console.log('idID:', internId);
    useEffect(() => {
        setLoading(true);
        TagApi.getQuestion({
            type: selectedKeys[0],
            state: selectedTab,
            internId,
        }).then(data => {
            console.log('dat:', data);
            setData(data.data)
        }).catch(error => notification.error({
            message: 'Error',
            description: error.response.data.message,
        })).finally(() => setLoading(false));
    }, [selectedKeys, selectedTab]);

    const handleAllowOrDisable = (id) => {
        setActionLoading({
            [`${id}-update`]: true,
        });
        TagApi.updateQuestion({
            id,
            state: selectedTab === 'DRAFT' ? 'ALLOW' : 'DRAFT'
        }).then(() => {
            notification.success({
                message: 'Success',
                description: 'Successfully Updated!',
            });
            setData(data.filter(item => item.id !== id));
        }).catch(err => notification.warning({
            message: 'Error',
            description: err.response.data.message,
        })).finally(() => setActionLoading({ [`${id}-update`]: false }));
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: `Do you want to delete this question?`,
            icon: <DeleteFilled />,
            onOk: () => {
                setActionLoading({
                    [`${id}-delete`]: true,
                });
                TagApi.deleteQuestion({
                    id,
                }).then(() => {
                    notification.success({
                        message: 'Success',
                        description: `Successfully deleted question`
                    });
                    setData(data.filter(item => item.id !== id));
                }).catch(err => notification.error({
                    message: 'Error',
                    description: err.response.data.message,
                })).finally(() => setActionLoading({ [`${id}-delete`]: false }));
            }
        });
    };

    const handleEdit = (item) => {
        if (form) {
            setCurrentType(item.type);
            form.setFieldsValue({
                type: item.type,
                text: item.text,
                question: item.question,
                correctIndex: item.correctIndex + 1,
            });

            setPossibleAnswers(Array(item.possibleAnswers.length).fill(0).map((_, index) => index));
            item.possibleAnswers.forEach((pAnswer, id) => {
                if (selectedKeys[0] === 'vocabulary')
                    form.setFieldValue(`possibleAnswer-${id}`, pAnswer.answer + '(' + pAnswer.hint + ')');
                else
                    form.setFieldValue(`possibleAnswer-${id}`, pAnswer);
            });
        }

        if (item.type === 'pictures' || item.type === 'symbols') {
            setCurrentPicList(item.pictures);
        }
        setCurrentItem(item);
        setShowEditModal(true);
    };

    const handleChangePicList = (e) => {
        setCurrentPicList(e.fileList.filter(item => item.status !== 'uploading').map(item => item.url));
    };

    const handleUpload = async (file) => {
        console.log('f:', file);
        const body = new FormData();
        body.append('picture', file);
        TagApi.uploadPicture(body).then(data => {
            setCurrentPicList([
                ...currentPicList,
                data.data.url,
            ]);
        }).catch(err => notification.error({
            message: 'Error',
            description: err.response.data.message,
        })).finally();
    };

    const [possibleAnswers, setPossibleAnswers] = useState([0, 1]);
    const [currentType, setCurrentType] = useState('pictures');
    const [saveLoading, setSaveLoading] = useState(false);
    const [form] = Form.useForm();
    const handleSubmit = () => {
        form.validateFields().then(values => {
            setSaveLoading(true);
            const body = {};
            body['type'] = values.type;
            body['question'] = values.question;
            body['correctIndex'] = values.correctIndex - 1;
            if (currentType === 'comprehension') {
                body['text'] = values.text;
            }
            const possibleAnswerList = [];
            possibleAnswers.forEach((_, index) => {
                possibleAnswerList.push(values[`possibleAnswer-${index}`]);
            });
            body['possibleAnswers'] = possibleAnswerList;
            if (values.picture && values.picture.fileList.length > 0) {
                const pictureList = [];
                currentPicList.forEach(url => {
                    pictureList.push(url);
                });

                body['pictures'] = pictureList;
            }

            TagApi.updateQuestion({
                id: currentItem.id,
                body
            }).then(res => {
                console.log('d:', res.data);
                notification.success({
                    message: 'Success',
                    description: 'Successfully Updated',
                });
                setData(data.map(item => {
                    if (item.id === currentItem.id) return res.data;
                    return item;
                }));
            }).catch(err => {
                notification.error({
                    message: 'Error',
                    description: err.response.data.message,
                });
            }).finally(() => setSaveLoading(false));
        });
    };

    const handleAddPossibleAnswer = () => {
        setPossibleAnswers([
            ...possibleAnswers,
            possibleAnswers.length,
        ]);
    };

    const handleDeletePossibleQuestion = (index) => {
        if (possibleAnswers.length <= 2) {
            notification.warning({
                message: 'Warning!',
                description: 'Possible Answers can not be smaller than 2',
            });

            return;
        }

        setPossibleAnswers(possibleAnswers.filter(item => item !== index));
    };

    return (
        <Layout className='tag-question-check'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    onSelect={e => setSelectedKeys([e.key])}
                    selectedKeys={selectedKeys}
                    items={[{
                        key: 'pictures',
                        icon: <PictureOutlined />,
                        label: 'Pictures',
                    }, {
                        key: 'symbols',
                        icon: <InfoOutlined />,
                        label: 'Signs & Symbols',
                    }, {
                        key: 'vocabulary',
                        icon: <ExclamationOutlined />,
                        label: 'Vocabulary',
                    }, {
                        key: 'blanks',
                        icon: <MinusOutlined />,
                        label: 'Blanks',
                    }, {
                        key: 'comprehension',
                        icon: <DribbbleOutlined />,
                        label: 'Comprehension'
                    }]}
                />
            </Sider>
            <Layout>
                <Header className='tag-question-check-header' style={{ backgroundColor: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className='menu-hold'
                    />
                    <h2>Welcome to Tag Question Check Page</h2>
                    <div className='state'>
                        <Space direction="vertical">
                            <Segmented
                                value={selectedTab}
                                onChange={e => setSelectedTab(e)}
                                options={!internId ? [{
                                    label: (
                                        <div className='p-1'>
                                            <QuestionCircleFilled />
                                            <div>Pending</div>
                                        </div>
                                    ),
                                    value: 'DRAFT',
                                }, {
                                    label: (
                                        <div className='p-1'>
                                            <CheckCircleFilled />
                                            <div>Allowed</div>
                                        </div>
                                    ),
                                    value: 'ALLOW',
                                }] : [{
                                    label: (
                                        <div className='p-1'>
                                            <QuestionCircleFilled />
                                            <div>Pending</div>
                                        </div>
                                    ),
                                    value: 'DRAFT',
                                }]}
                            />
                        </Space>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {
                        loading ? <Spin /> :
                            data.map((item, index) => {
                                return (
                                    <div className="whole" key={item.id}>
                                        <div className='head'>
                                            <p>{`Question ${index + 1}`}</p>
                                            <p className='ms-3'>{`Intern ID: ${item.internId ? item.internId : 'NULL'}`}</p>
                                            <div className='action'>
                                                {!internId &&
                                                    <Button
                                                        className='me-2'
                                                        onClick={() => handleAllowOrDisable(item.id)}
                                                        loading={actionLoading[`${item.id}-update`]}
                                                    >
						{selectedTab === "DRAFT"
                            ? translate("allow")
                            : translate("draft")}
                                                    </Button>
                                                }
                                                <Button
                                                    className='me-2'
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    {translate("edit")}
                                                </Button>
                                                {!internId &&
                                                    <Button
                                                        loading={actionLoading[`${item.id}-delete`]}
                                                        onClick={() => handleDelete(item.id)}>{translate("delete")}
                                                    </Button>
                                                }
                                            </div>
                                        </div>
                                        {
                                            item.text && <pre>{item.text}</pre>
                                        }
                                        <div className="question">{item.question}</div>
                                        {
                                            item.pictures && item.pictures.map((picture, id) => {
                                                return (<img src={picture} alt={`${picture}-index`} key={id} />)
                                            })
                                        }
                                        {
                                            item.possibleAnswers.map((pAnswer, id) => {
                                                return (
                                                    <div
                        key={id}
                        className={
                          id === item.correctIndex
                            ? translate("correct")
                            : translate("wrong")
                        }
                      >
                                                        {
                                                            selectedKeys[0] === 'vocabulary' ? `- ${pAnswer.answer}${pAnswer.hint ? `(${pAnswer.hint})` : ''}` : `- ${pAnswer}`
                                                        }
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                );
                            })
                    }
                    <Modal
                        className='edit-modal'
                        open={showEditModal}
                        footer={[
                            <Button key="confirm" loading={saveLoading} onClick={handleSubmit}>{translate("save")}</Button>,
                            <Button key="cancel" onClick={() => setShowEditModal(false)}>{translate("cancel")}</Button>
                        ]}
                    >
                        <Form
                            onFinish={handleSubmit}
                            form={form}
                        >
                            <Form.Item
                                name="type"
                                label="Select Type"
                                required
                                rules={[{ required: true, message: 'Please Select Current Type' }]}
                            >
                                <Select
                                    options={typeOptions}
                                    onChange={e => setCurrentType(e)}
                                    value={currentType}
                                />
                            </Form.Item>
                            {
                                currentType === 'comprehension' &&
                                <Form.Item
                                    name="text"
                                    label="Input Text"
                                    required
                                    rules={[{ required: true, message: 'Please Input Text' }]}
                                >
                                    <Input.TextArea />
                                </Form.Item>
                            }
                            <Form.Item
                                name="question"
                                label="Input Question"
                                required
                                rules={[{ required: true, message: 'Please Input Question' }]}
                            >
                                <Input />
                            </Form.Item>
                            {
                                possibleAnswers.map((id, index) => {
                                    return (
                                        <div className='possible-answer' key={id}>
                                            <Form.Item
                                                name={`possibleAnswer-${id}`}
                                                label={(
                                                    <span className='answer-label'>
                                                        <span>
                                                            {translate("input-possible-answer")} {index + 1}
                                                        </span>
                                                        <Button className='delete-button' onClick={() => handleDeletePossibleQuestion(id)}>
                                                            <DeleteOutlined />
                                                        </Button>
                                                    </span>
                                                )}
                                                required
                                                rules={[{ required: true, message: 'Please Input Possible Answers' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            {
                                                index === possibleAnswers.length - 1 &&
                                                <Button onClick={handleAddPossibleAnswer} className='mb-2'>{translate("add-possible-answer")}</Button>
                                            }
                                        </div>
                                    );
                                })
                            }
                            {
                                (currentType === 'pictures' || currentType === 'symbols') &&
                                <Form.Item
                                    name="picture"
                                    label="Select Pictures"
                                >
                                    <Upload
                                        fileList={currentPicList.map(item => ({
                                            url: item,
                                        }))}
                                        onChange={handleChangePicList}
                                        name='picture'
                                        action={(file) => handleUpload(file)}
                                        listType="picture-card"
                                    >
                                        <div>
                                            <PlusOutlined style={{ color: 'white' }} />
                                            <div style={{ marginTop: 8, color: 'white' }}>{translate("upload")}</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            }
                            <Form.Item
                                name="correctIndex"
                                label="Please Input Correct One"
                                rules={[{ required: true, message: 'Please Input Correct Index' }]}
                            >
                                <InputNumber placeholder='e.g: 1' min={1} max={possibleAnswers.length} />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default TagQuestionCheck;