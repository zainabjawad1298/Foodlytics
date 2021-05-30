import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Tooltip, Icon } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';
import { ChartCard, MiniBar, Pie, yuan, TimelineChart } from '@/components/Charts';

const { Description } = DescriptionList;

const progressColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="processing" text="进行中" />
      ),
  },
  {
    title: '操作员ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
    key: 'cost',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'profile/fetchBasic',
      payload: params.id || '1000000000',
    });
  }

  render() {
    const { profile = {}, loading } = this.props;
    const { basicGoods = [], basicProgress = [], userInfo = {}, application = {} } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: '商品编号',
        dataIndex: 'id',
        key: 'id',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'right',
        render: renderContent,
      },
      {
        title: '数量（件）',
        dataIndex: 'num',
        key: 'num',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    const visitData = [
      {
        x: '2017-09-01',
        y: 100,
      },
      {
        x: '2017-09-02',
        y: 120,
      },
      {
        x: '2017-09-03',
        y: 88,
      },
      {
        x: '2017-09-04',
        y: 65,
      },
      {
        x: '2017-09-05',
        y: 100,
      },
      {
        x: '2017-09-06',
        y: 120,
      },
      {
        x: '2017-09-07',
        y: 88,
      },
      {
        x: '2017-09-08',
        y: 65,
      },
      {
        x: '2017-09-09',
        y: 100,
      },
      {
        x: '2017-09-10',
        y: 120,
      },
      {
        x: '2017-09-11',
        y: 88,
      },
      {
        x: '2017-09-12',
        y: 65,
      },
      {
        x: '2017-09-13',
        y: 100,
      },
      {
        x: '2017-09-14',
        y: 120,
      },
      {
        x: '2017-09-15',
        y: 88,
      },
      {
        x: '2017-09-16',
        y: 65,
      },
    ];

    const salesPieData = [
      {
        x: '家用电器',
        y: 4544,
      },
      {
        x: '食用酒水',
        y: 3321,
      },
      {
        x: '个护健康',
        y: 3113,
      },
      {
        x: '服饰箱包',
        y: 2341,
      },
      {
        x: '母婴产品',
        y: 1231,
      },
      {
        x: '其他',
        y: 1231,
      },
    ];

    const chartData = [];
    for (let i = 0; i < 20; i += 1) {
      chartData.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 1000,
        y2: Math.floor(Math.random() * 100) + 10,
      });
    }

    return (
      <PageHeaderWrapper title="基础详情页" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="退款申请" style={{ marginBottom: 32 }}>
            <Description term="取货单号">{application.id}</Description>
            <Description term="状态">{application.status}</Description>
            <Description term="销售单号">{application.orderNo}</Description>
            <Description term="子订单">{application.childOrderNo}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
            <Description term="用户姓名">{userInfo.name}</Description>
            <Description term="联系电话">{userInfo.tel}</Description>
            <Description term="常用快递">{userInfo.delivery}</Description>
            <Description term="取货地址">{userInfo.addr}</Description>
            <Description term="备注">{userInfo.remark}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>退货商品</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>退货进度</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
          <ChartCard
            title="Payments"
            action={
              <Tooltip title="Payments reflect the quality of transaction">
                <Icon type="exclamation-circle-o" />
              </Tooltip>
            }
            total="6,500"
            contentHeight={100}
          >
            <MiniBar height={100} data={visitData} />
          </ChartCard>,
          <Pie
            hasLegend
            title="销售额"
            subTitle="销售额"
            total={() => (
              <span
                dangerouslySetInnerHTML={{
                  __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
                }}
              />
            )}
            data={salesPieData}
            valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
            height={294}
          />,
          <TimelineChart height={200} data={chartData} titleMap={{ y1: '客流量', y2: '支付笔数' }} />,
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
