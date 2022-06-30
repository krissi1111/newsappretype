import React, { useEffect } from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { NewsCardList } from "./components/newsCards/NewsCardList";
import { Card, Col, Container, Row } from 'react-bootstrap';
import { SearchTab } from './components/search/Search';
import { useDispatch, useSelector } from "react-redux";
import { selectNewsData } from "./redux/slices/newsSlice";
import { Header } from "./components/header/Header";
import { Initializer } from "./services/initialize";
import { PopularNews } from "./components/newsCards/NewsPopular";

function App() {
  let newsData2 = useSelector(selectNewsData)

  const dispatch = useDispatch()

  useEffect(() => {
    Initializer(dispatch)
  }, [dispatch])

  return (
    <Container fluid style={{ marginTop: '0rem' }}>
      <Row className='mb-2'>
        <Header/>
      </Row>
      <Row>
        <Col xl xxl="2">
          <Wrapper>
            <SearchTab/>
          </Wrapper>
        </Col>
        <Col xl xxl="8">
          <Wrapper>
            <NewsCardList newsCards={newsData2}/>
          </Wrapper>
        </Col>
        <Col xl xxl="2">
          <PopularNews/>
        </Col>
      </Row>
    </Container>
  );
}

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return(
    <Card>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  )
}

export default App;
