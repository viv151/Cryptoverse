import {React, useState} from 'react';
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';
import Loader from './Loader';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
const {Text, Title} = Typography;
const {Option} = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory});

  if(!cryptoNews?.items) return <Loader />;
  // console.log(cryptoNews);
  // console.log(cryptoNews.items[0].images.thumbnailProxied);


  return (
    <Row gutter={[24, 24]}>

{!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency, i) => <Option value={currency.name} key={i}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.items.map((news, i) =>(
        <Col xs={24} sm={12} lg={8} key={i}>
            <Card className='news-card' hoverable >
              <a href={news.newsUrl} target='_blank' rel='noreferrer'>
                <div className="news-image-container">
                  <Title className='news-title' level={4}>{news.title}</Title>
                  <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news.images?.thumbnailProxied || demoImage} alt='news'/>
                </div>
                <p>
                  {news.snippet > 100 
                  ? `${news.snippet.substring(0, 100)}...`
                  : news.snippet
                  }
                </p>
                <div className="provider-container">
                  <div>
                    {/* <Avatar src ={news.images?.thumbnailProxied || demoImage}  alt=''/> */}
                    <Text className='provider-name'>{news.publisher}</Text>
                  </div>
                  {/* <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text> */}
                </div>
              </a>
            </Card> 
        </Col>
      )).slice(0, simplified ? 6 : 12 )}
    </Row>
  
  );
};

export default News