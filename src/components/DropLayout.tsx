import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography ,message} from 'antd';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [{label:"user Center", key:'userCenter'},{label:"log Out",key:"logOut"}]
const navigate=useNavigate();
const DropLayout: React.FC = () => (
  <Dropdown

    menu={{
        onClick:({key})=>{
            if(key==="logOut")
            {
              navigate('/')
            }else
            {
              message.info("No Data Yet")
            };
        },
      items,
      selectable: true,
      defaultSelectedKeys: ['3'],
    }}
  >
    <Typography.Link>
      <Space>
        Setting
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
);

export default DropLayout;