import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

// reduxからstate取得してrenderまでの流れ
// dispatch(listProducts action) -> useSelectorでproductList state取得 -> render
const HomeScreen = () => {
  // actionをdispatchするため
  const dispatch = useDispatch()
  // useSelectorでstoreからstateを取得
  const productList = useSelector((state) => state.productList)
  // productList reducerでsetされるstateを分割代入で取得
  const { loading, error, products } = productList
  // stateless functional componentはstateを持つことができないが、hooksを使うことでreact側にstateを保持させることで、擬似的にstateを導入できる
  // conmpnentのrendering後に実行されるhook、lifecycle methodのようなもの
  useEffect(() => {
    dispatch(listProducts())
    // 第二引数に与えられたstateに変化があったときに、第一引数の関数が実行される
    // 第2引数を指定なし => Render毎(state, propsのうちいずれかが更新される度)に第１引数の関数を実行。
    // 第2引数に[]を指定 => mount, unmount時に第１引数の関数を実行。
    // 第2引数に値の配列を指定 => mount時と指定された値に変化があった場合のみに第１引数の関数を実行。
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
