import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
  // stateless functional componentはstateを持つことができないが、hooksを使うことでreact側にstateを保持させることで、擬似的にstateを導入できる
  // useState(initialState)でstate, stateをsetする関数がarrayで返ってくる。initialStateのproductsは複数なのでempty arrayを指定
  const [products, setProducts] = useState([])
  // conmpnentのrendering後に実行されるhook、lifecycle methodのようなもの
  useEffect(() => {
    // useEffectの第一引数の関数にasyncを指定できないので、中で別の関数にasync関数を作成
    const fetchProducts = async () => {
      // status, dataなどのkeyを持つresponseが返ってくる
      const { data } = await axios.get('/api/products')
      // products stateにdataをset
      setProducts(data)
    }
    fetchProducts()
    // 第二引数に与えられたstateに変化があったときに、第一引数の関数が実行される
    // 第2引数を指定なし => Render毎(state, propsのうちいずれかが更新される度)に第１引数の関数を実行。
    // 第2引数に[]を指定 => mount, unmount時に第１引数の関数を実行。
    // 第2引数に値の配列を指定 => mount時と指定された値に変化があった場合のみに第１引数の関数を実行。
  }, [])
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col
            key={product._id}
            sm={12} md={6} lg={4} xl={3}
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen