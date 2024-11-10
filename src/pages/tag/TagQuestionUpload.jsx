import React, { useState } from 'react';
import { Form, Input, Select, Button, notification, Upload, InputNumber, Modal } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import TagApi from '../../api-clients/TagApi';

import "./TagQuestionUpload.scss";
import useLanguageToggle from "../../hooks/useLanguageToggle";

export const typeOptions = [{
    label: 'Pictures',
    value: 'pictures'
}, {
    label: 'Signs & Symbols',
    value: 'symbols'
}, {
    label: 'Vocabulary',
    value: 'vocabulary'
}, {
    label: 'Blanks',
    value: 'blanks'
}, {
    label: 'Reading Comprehension',
    value: 'comprehension',
}]

const TagQuestionUpload = () => {
  const { translate } = useLanguageToggle();
    const [possibleAnswers, setPossibleAnswers] = useState([0, 1]);
    const [currentType, setCurrentType] = useState('pictures');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);
    const [internId, setInternId] = useState('');
    const [form] = Form.useForm();

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

    const handleSubmit = () => {
        if (internId.length <= 0) {
            notification.warning({
                message: 'Warning!',
                description: 'Please Input your InternID',
            });
            return;
        }
        form.validateFields().then(values => {
            console.log('values:', values);
            setLoading(true);
            const body = {};
            body['internId'] = internId;
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
                values.picture.fileList.forEach(file => {
                    pictureList.push(file.response.url);
                });

                body['pictures'] = pictureList;
            }
            TagApi.uploadQuestion(body).then(() => {
                notification.success({
                    message: 'Success',
                    description: 'Successfully Uploaded',
                });
                console.log('ids:', Object.keys(values).filter(key => (key !== 'internId' && key !== 'type')));
                form.resetFields(Object.keys(values).filter(key => (key !== 'internId' && key !== 'type')));
                // setCurrentType(typeOptions[0].value);
            }).catch(err => {
                notification.error({
                    message: 'Error',
                    description: err.response.data.message,
                });
            }).finally(() => setLoading(false));
        });
    };

    const handleConfirmInternID = () => {
        setOpen(false);

    };

  return (
    <div className="tag-question-upload">
      <div className="bg-image" />
      <Button className="change-intern-id" onClick={() => setOpen(true)}>
        {translate("set-your-intern-id")}
      </Button>
      {internId.length > 0 && (
        <Link className="check-uploaded" to={`/tag-question-check/${internId}`}>
          {translate("check-my-uploadings")}
        </Link>
      )}

      <div className="body">
        <h2>{translate("welcome-to-tag-question-upload-page")}</h2>
        <Form
          onFinish={handleSubmit}
          form={form}
          initialValues={{
            type: typeOptions[0].value,
          }}
        >
          {/* <Form.Item
                        name="internId"
                        label="Your Intern ID"
                        required
                        rules={[{ required: true, message: 'Please Input Your Intern ID' }]}
                    >
                        <Input />
                    </Form.Item> */}
          <Form.Item
            name="type"
            label="Select Type"
            required
            rules={[{ required: true, message: "Please Select Current Type" }]}
          >
            <Select
              options={typeOptions}
              onChange={(e) => setCurrentType(e)}
              value={currentType}
            />
          </Form.Item>
          {currentType === "comprehension" && (
            <Form.Item
              name="text"
              label="Input Text"
              required
              rules={[{ required: true, message: "Please Input Text" }]}
            >
              <Input.TextArea />
            </Form.Item>
          )}
          <Form.Item
            name="question"
            label="Input Question"
            required
            rules={[{ required: true, message: "Please Input Question" }]}
          >
            <Input />
          </Form.Item>
          {possibleAnswers.map((id, index) => {
            return (
              <div className="possible-answer" key={id}>
                <Form.Item
                  name={`possibleAnswer-${id}`}
                  label={
                    <span className="answer-label">
                      <span>
                        {translate("input-possible-answer")}
                        {index + 1}
                      </span>
                      <Button
                        className="delete-button"
                        onClick={() => handleDeletePossibleQuestion(id)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </span>
                  }
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please Input Possible Answers",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                {index === possibleAnswers.length - 1 && (
                  <Button onClick={handleAddPossibleAnswer} className="mb-2">
                    {translate("add-possible-answer")}
                  </Button>
                )}
              </div>
            );
          })}
          {(currentType === "pictures" || currentType === "symbols") && (
            <Form.Item name="picture" label="Select Pictures">
              <Upload
                name="picture"
                action={`${process.env.REACT_APP_API_PUBLIC_URL}/tag/picture`}
                listType="picture-card"
              >
                <div>
                  <PlusOutlined style={{ color: "white" }} />
                  <div style={{ marginTop: 8, color: "white" }}>
                    {translate("upload")}
                  </div>
                </div>
              </Upload>
            </Form.Item>
          )}
          <Form.Item
            name="correctIndex"
            label="Please Input Correct One"
            rules={[{ required: true, message: "Please Input Correct Index" }]}
          >
            <InputNumber
              placeholder="e.g: 1"
              min={1}
              max={possibleAnswers.length}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={loading}>
              {translate("save")}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        open={open}
        footer={[
          <Button onClick={handleConfirmInternID} key="confirm">
            {translate("confirm")}
          </Button>,
        ]}
      >
        <p>{translate("please-input-your-internid")}</p>
        <Input value={internId} onChange={(e) => setInternId(e.target.value)} />
      </Modal>
    </div>
  );
};

export default TagQuestionUpload;