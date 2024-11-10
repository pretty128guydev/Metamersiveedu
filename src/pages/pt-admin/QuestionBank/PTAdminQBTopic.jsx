/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
// import { useSelector } from "react-redux";
import clsx from "clsx";
import QBApi from "../../../api-clients/QBApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { loadingState } from "../../../utils/state";
import { TagsInput } from "react-tag-input-component";

function PTAdminQBTopic() {
    const context = useContext(AppSettings);
    // const userInfo = useSelector((store) => store.auth.userInfo);
    const [tableData, setTableData] = useState([]);
    const [selectedTable, setSelectedTable] = useState();
    const [loading, setLoading] = useState(false);
    const [addTopicLoading, setAddTopicLoading] = useState(loadingState.before);
    const [shareTopicLoading, setShareTopicLoading] = useState(
        loadingState.before
    );
    const navigate = useNavigate();
    const { subject_id, teacher_id } = useParams();
    const [emailsToShare, setEmailsToShare] = useState([]);

    const modalAddTopic = document.getElementById("modalAddTopic");

    modalAddTopic?.addEventListener("shown.bs.modal", () => {
        const inputName = document.getElementById("topicName");
        inputName.value = "";
        inputName.focus();
        setAddTopicLoading(loadingState.before);
    });

    const openQuestions = (table) => {
        navigate(`${table.id}`, {
            state: { subject_id: table.id },
        });
    };
    useEffect(() => {
        setLoading(true);

        QBApi.getTopics({ teacher_id, subject_id: subject_id }).then(
            (res) => {
                setTableData(res.data);
                setLoading(false);
            }
        );

        context.setAppContentFullHeight(true);
        context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

        return function cleanUp() {
            context.setAppContentFullHeight(false);
            context.setAppContentClass("");
        };

        // eslint-disable-next-line
    }, []);

    const handleAddTopic = (event) => {
        event.preventDefault();

        const topicName = event.target.topicName.value;
        if (topicName === "") return;

        setAddTopicLoading(loadingState.loading);

        QBApi.addTopic(
            { teacher_id, subject_id: subject_id }, //query
            { topic_name: topicName } //body
        )
            .then((res) => {
                setTableData([...tableData, { id: res.data.docId, name: topicName }]);
                setAddTopicLoading(loadingState.after);
            })
            .catch((_) => {
                setAddTopicLoading(loadingState.after);
            });
    };

    const handleShareTopic = (event) => {
        event.preventDefault();

        setShareTopicLoading(loadingState.loading);
        QBApi.shareTopic(
            {
                teacher_id,
                subject_id: subject_id,
                topic_id: selectedTable.id,
            },
            { share_to: emailsToShare }
        )
            .then((_) => {
                const t_tableData = tableData.map((table) => {
                    let t_table = table;
                    if (t_table.id === selectedTable.id) {
                        t_table.sharedTo = emailsToShare;
                    }
                    return t_table;
                });
                setTableData(t_tableData);
                setShareTopicLoading(loadingState.after);
            })
            .catch((_) => {
                setShareTopicLoading(loadingState.after);
            });
    };

    const onSelectTable = (table) => {
        setSelectedTable(table);
        setEmailsToShare(table.sharedTo);
    };

    return (
        <div className="h-100">
            <Card className={"pos pos-vertical"} id="pos">
                <CardBody className="pos-container">
                    <div className="pos-content">
                        <div className="pos">
                            <div className="pos-container">
                                <div className="pos-content h-100">
                                    {loading ? (
                                        <div className="d-flex align-items-center justify-content-center h-100">
                                            <BarsScale />
                                        </div>
                                    ) : (
                                        <div>
                                            <hr className="m-0" />

                                            <PerfectScrollbar className="pos-content-container p-3 h-100">
                                                <div className="row gx-3">
                                                    {tableData && tableData.length > 0 ? (
                                                        tableData.map((table, index) => (
                                                            <div
                                                                className="col-xl-3 col-lg-4 col-md-6 pb-3"
                                                                key={index}
                                                            >
                                                                <Card
                                                                    className={
                                                                        "pos-checkout-table in-use" +
                                                                        (selectedTable &&
                                                                            table.id === selectedTable.id
                                                                            ? " selected"
                                                                            : "")
                                                                    }
                                                                    style={{ height: "120px" }}
                                                                >
                                                                    <div
                                                                        className="pos-checkout-table-container d-flex align-items-center justify-content-center"
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() => onSelectTable(table)}
                                                                        onDoubleClick={() => openQuestions(table)}
                                                                    >
                                                                        <div className="pos-checkout-table-header">
                                                                            <div className="status">
                                                                                <i
                                                                                    className={clsx({
                                                                                        "bi bi-circle-fill text-theme": true,
                                                                                    })}
                                                                                ></i>
                                                                            </div>
                                                                            <div className="d-flex align-items-center justify-content-center">
                                                                                <div
                                                                                    className="fw-bold"
                                                                                    style={{ fontSize: "20px" }}
                                                                                >
                                                                                    {table.name.substr(0, 18) +
                                                                                        (table.name.length > 18
                                                                                            ? "..."
                                                                                            : "")}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Card>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="col-12">No records found</div>
                                                    )}
                                                </div>
                                            </PerfectScrollbar>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <div className="modal fade" id="modalAddTopic">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className="was-validated" onSubmit={handleAddTopic}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Topic Name<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={
                                            "form-control form-control-lg bg-white bg-opacity-5"
                                        }
                                        id="topicName"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                {addTopicLoading === loadingState.before && (
                                    <button type="submit" className="btn btn-outline-theme">
                                        Save
                                    </button>
                                )}
                                {addTopicLoading === loadingState.loading && <BarsScale />}
                                {addTopicLoading === loadingState.after && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-theme"
                                        data-bs-dismiss="modal"
                                    >
                                        Done
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalShareTopic">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className="was-validated" onSubmit={handleShareTopic}>
                            <div className="modal-body">
                                {selectedTable === undefined ? (
                                    <div>You must select topic to share. Thanks.</div>
                                ) : (
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Share To<span className="text-danger">*</span>
                                        </label>
                                        <TagsInput
                                            value={emailsToShare}
                                            name="emails"
                                            placeHolder="Enter emails here"
                                            id="emails"
                                            onChange={(tags) => setEmailsToShare(tags)}
                                        />
                                    </div>
                                )}
                            </div>
                            {selectedTable !== undefined && (
                                <div className="modal-footer">
                                    {shareTopicLoading === loadingState.before && (
                                        <button type="submit" className="btn btn-outline-theme">
                                            Share
                                        </button>
                                    )}
                                    {shareTopicLoading === loadingState.loading && <BarsScale />}
                                    {shareTopicLoading === loadingState.after && (
                                        <button
                                            type="button"
                                            className="btn btn-outline-theme"
                                            data-bs-dismiss="modal"
                                        >
                                            Done
                                        </button>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PTAdminQBTopic;
