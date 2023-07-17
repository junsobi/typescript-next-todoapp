import { Table } from 'antd';

const columns = [
  {
    title: '필드명',
    dataIndex: 'name',
  },
  {
    title: '설명',
    dataIndex: 'description',
  },
  {
    title: '타입',
    dataIndex: 'type',
  },
];

const data = [
  {
    key: '1',
    name: 'id',
    type: 'string',
    description: '고유 식별자',
  },
  {
    key: '2',
    name: 'title',
    type: 'string',
    description: '할 일의 제목',
  },
  {
    key: '3',
    name: 'content',
    type: 'string',
    description: '할 일의 내용',
  },
  {
    key: '4',
    name: 'categories',
    type: 'string[]',
    description: '할 일의 카테고리',
  },
  {
    key: '5',
    name: 'status',
    type: `'inProgress' 또는 'completed'`,
    description: '할 일의 상태',
  },
  {
    key: '6',
    name: 'createdDateTime',
    type: 'Date',
    description: '할 일 생성 날짜 및 시간',
  },
  {
    key: '7',
    name: 'lastModifiedDateTime',
    type: 'Date',
    description: '마지막 수정 날짜 및 시간',
  },
  {
    key: '8',
    name: 'DueDateTime',
    type: 'Date',
    description: '마감기한',
  },
];

const Scheme = () => {
  return (
    <div className="p-10">
      <div className="text-xl mb-4">Data Scheme</div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default Scheme;
