import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Tag, Timeline, Upload } from "antd";
import { UploadOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import "./ComplaintsTable.css";
import MenuTable from "../Home/MenuTable";

const { Option } = Select;

const ComplaintsTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isComplaintDetailVisible, setIsComplaintDetailVisible] = useState(false);
  const [form] = Form.useForm();

  const [data, setData] = useState([
    {
      key: "1",
      date: "2024-12-12",
      category: "Food",
      complaint: "Quality of food is not good",
      status: "Pending",
      timeline: [
        { timestamp: "2024-12-12", action: "Complaint Registered" },
        { timestamp: "2024-12-13", action: "Complaint under review" },
      ],
      image: null, // No image uploaded
    },
    {
      key: "2",
      date: "2024-12-11",
      category: "Cleanliness",
      complaint: "Rooms are not cleaned properly",
      status: "Resolved",
      timeline: [
        { timestamp: "2024-12-11", action: "Complaint Registered" },
        { timestamp: "2024-12-12", action: "Complaint resolved" },
      ],
      image: "https://via.placeholder.com/150", // Example uploaded image
    },
  ]);

  const [uploadedImage, setUploadedImage] = useState(null); // Store the uploaded image
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Complaint Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Complaint",
      dataIndex: "complaint",
      key: "complaint",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const isPending = status === "Pending";
        return (
          <a
            onClick={() => handleStatusClick(record)}
            style={{ color: isPending ? "orange" : "green", cursor: "pointer" }}
          >
            <Tag
              color={isPending ? "orange" : "green"}
              icon={isPending ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
            >
              {status}
            </Tag>
          </a>
        );
      },
    },
  ];

  const handleRaiseComplaint = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUploadedImage(null); // Reset image
    form.resetFields();
  };

  const handleUploadChange = (info) => {
    if (info.file && info.file.originFileObj) {
      setUploadedImage(info.file.originFileObj);
    } else {
      setUploadedImage(null);
    }
  };

  const handleSubmit = (values) => {
    const newComplaint = {
      key: data.length + 1,
      date: new Date().toISOString().split("T")[0],
      category: values.category,
      complaint: values.complaint,
      status: "Pending",
      timeline: [{ timestamp: new Date().toISOString().split("T")[0], action: "Complaint Registered" }],
      image: uploadedImage ? URL.createObjectURL(uploadedImage) : null,
    };

    setData([...data, newComplaint]);
    setIsModalVisible(false);
    setUploadedImage(null); // Reset image
    form.resetFields();
  };

  const handleStatusClick = (complaint) => {
    setSelectedComplaint(complaint);
    setIsComplaintDetailVisible(true);
  };

  const handleComplaintDetailCancel = () => {
    setIsComplaintDetailVisible(false);
  };

  return (
<>
    
    <div className="complaints-container">
      

      <div>
      <h2
  style={{
    fontFamily: "'Roboto', sans-serif",
    fontSize: "24px",
    fontWeight: "600",
    color: "#003366",
    textAlign: "center",
    textTransform: "capitalize",
    margin: "20px 0",
    paddingBottom: "10px",
    borderBottom: "2px solid #0066cc",
    letterSpacing: "1px",
    lineHeight: "1.5",
  }}
>
    Student Dashboard
</h2>

      </div>

      <div className="complaints-header">
        <Button type="primary" onClick={handleRaiseComplaint}>
          Raise a Complaint
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        className="complaints-table"
      />

      {/* Modal for Raising Complaint */}
      <Modal
        title="Raise a Complaint"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="category"
            label="Complaint Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category">
              <Option value="Timeliness">Timeliness of service</Option>
              <Option value="Cleanliness of Mess">Cleanliness of dining hall,plates and surroundings</Option>
              <Option value="Quality of food">Food Quality  including Rice,Snacks,Tea,Coffee and Breakfast</Option>
              <Option value="Quantity of food">Quantity of food served as per Menu</Option>
              <Option value="Courtesy of Mess staff"> Courtesy of Mess staff as per the Menu</Option>
              <Option value="Staff hygine">Staff Hygine(uniforms,gloves,masks)</Option>
              <Option value="Cooking and serving">Cooking and Serving adherence to the menu</Option>
              <Option value="Cleanliness of Wash basins">Cleanliness of wash basins and wash areas</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="complaint"
            label="Complaint Description"
            rules={[{ required: true, message: "Please provide a description" }]}
          >
            <Input.TextArea placeholder="Describe your complaint" rows={4} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Image"
          >
            <Upload
              name="complaintImage"
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Complaint Timeline and Details */}
      <Modal
        title="Complaint Details"
        visible={isComplaintDetailVisible}
        onCancel={handleComplaintDetailCancel}
        footer={null}
      >
        {selectedComplaint && (
          <div>
            <p><strong>Complaint Category:</strong> {selectedComplaint.category}</p>
            <p><strong>Complaint Description:</strong> {selectedComplaint.complaint}</p>
            {selectedComplaint.image && (
              <div>
                <p><strong>Uploaded Image:</strong></p>
                <img
                  src={selectedComplaint.image}
                  alt="Complaint"
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
              </div>
            )}
            <Timeline>
              {selectedComplaint.timeline.map((entry, index) => (
                <Timeline.Item key={index} color={index % 2 === 0 ? "green" : "blue"}>
                  <strong>{entry.timestamp}</strong>: {entry.action}
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        )}
      </Modal>
    

      <div>
       <h2>Menu of RGUKT-ONGOLE CAMPUS </h2>
       <MenuTable/>
    </div>
      
    </div>
    </>
  );
};

export default ComplaintsTable;
