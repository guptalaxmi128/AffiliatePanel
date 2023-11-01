
import React,{ useEffect} from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { getCourse } from '../../../actions/course/course';




const ShowCourseTable = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const course=useSelector((state)=>state.course.course);
    const data=course?.data;

    useEffect(() => {
        dispatch(getCourse());
      }, [dispatch]);
  

      
const handleAddSection = (courseId) => {

    console.log('Add Section for Course ID:', courseId);
    navigate(`/get-course/courses/${courseId}`);
  };

  const tableContentStyle = {
    fontFamily: 'Rajdhani',
    textAlign:'center'
  };

const columns = [
  {
    title: 'SNo',
    dataIndex: 'sno',
    key: 'sno',
    render: (text, record, index) => <span>{index + 1}</span>,
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: 'Course Name',
    dataIndex: 'title',
    key: 'title',
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    render: (text, record) => (
      <Button type="link" onClick={() => handleAddSection(record.id)}>
        {text}
      </Button>
    ),
  },
];
  return (
    <div className="all-course">
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h2>All Courses</h2>
     
    </div>
    <div className="all-course-text">
    Create and manage courses in your school.
    </div>
    <div style={{ overflowX: 'auto' }}>
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
    />
    </div>
    </div>
  );
};

export default ShowCourseTable;
