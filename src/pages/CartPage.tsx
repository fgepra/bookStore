import React, { useMemo } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { increase, plusCount, minusCount, resetCart } from '../data/Store';
import type { RootState } from '../data/Store';

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const getTotalAmount = useMemo(() =>
    cartItems.reduce((total, item) => total + item.quantity * item.price, 0),
    [cartItems]
  );

  return (
    <div>
      <Container>
        <h2>장바구니</h2>
        <Table bordered>
          <thead>
            <tr>
              <th>상품ID</th>
              <th>상품명</th>
              <th>수량</th>
              <th>상품금액</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.quantity * item.price}</td>
                <td>
                  <Button
                    className="btn-warning"
                    style={{ marginRight: '5px' }}
                    onClick={() => dispatch(plusCount(item.id))}
                  >+</Button>
                  <Button
                    className="btn-secondary"
                    onClick={() => dispatch(minusCount({ id: item.id }))}
                  >-</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row className="mt-3">
          <Col>
            <h5>총 상품금액: {getTotalAmount.toLocaleString()}원</h5>
          </Col>
          <Col className="text-end">
            <div>사용자: {user.name}</div>
            <div>아이디: {user.id}</div>
            <Button
              variant="success"
              className="me-2 mt-2"
              onClick={() => dispatch(increase(10))}
            >
              주문하기
            </Button>
            <Button
              variant="danger"
              className="mt-2"
              onClick={() => dispatch(resetCart())}
            >
              카트 비우기
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
