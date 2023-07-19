import { Fragment } from 'react';
type DataType = {
  key: string;
  name: string;
  type: string;
  description: string;
};
const data: DataType[] = [
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

interface TableRowProps {
  item: DataType;
}

const TableRow: React.FC<TableRowProps> = ({ item }) => (
  <tr className="even:bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
    <td className="px-6 py-4 border-r border-gray-100 whitespace-nowrap text-sm font-medium text-gray-900">
      {item.name}
    </td>
    <td className="px-6 py-4 border-r border-gray-50 whitespace-nowrap text-sm text-gray-500">
      {item.description}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {item.type}
    </td>
  </tr>
);

const Scheme = () => (
  <div className="flex flex-col p-10">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 border-r border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  필드명
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  설명
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  타입
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <TableRow key={index} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default Scheme;
