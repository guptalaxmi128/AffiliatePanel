import React,{useEffect} from 'react';
import { Table, Button,message } from 'antd';
import { getForm } from '../../../../actions/addForm/addForm';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const tableContentStyle = {
    fontFamily: "Rajdhani",
    textAlign: "center",
  };

const AllForms = () => {
  const dispatch=useDispatch();
  const templateData=useSelector((state=>state.form.formInfo));

  
  useEffect(() => {
    dispatch(getForm());
  }, [dispatch]);

  const dataSource = templateData?.data?.map((item) => ({
    key: item.id,
    courseName: item.course.title,
    price: `₹${item.course.price}`,
    HTMLCode: item.HTMLCode,
  }));
  
  const handleCopySuccess = (courseName) => {
    message.success(`HTML Code for ${courseName} copied to clipboard!`);
  };
 

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: 'HTML Code',
      key: 'HTMLCode',
      render: (text, record) => (
        <CopyToClipboard text={record.HTMLCode} onCopy={() => handleCopySuccess(record.courseName)}>
          <Button type="default">Copy HTML Code</Button>
        </CopyToClipboard>
      ),
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: 'JavaScript Code',
      key: 'javascriptCode',
      render: (text, record) => (
        <Button type="default" onClick={() => handleJavascriptCodeClick(record)}>
          JavaScript Code
        </Button>
      ),
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
  ];



  // Event handler for JavaScript Code button
  const handleJavascriptCodeClick = (record) => {
    // Add your logic for handling JavaScript Code button click here
    console.log(`JavaScript Code for ${record.courseName}`);
  };

  return <Table dataSource={dataSource} columns={columns} />;
};

export default AllForms;
