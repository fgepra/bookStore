import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";

const AboutPage: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("감지된 요소:", entry.target);
          console.log("보이는 상태?:", entry.isIntersecting);

          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".hidden");
    console.log("감지할 요소들:", elements);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Container>
        <Row className="text-center">
          <Col md={6} className="header_left hidden">
            <header className="header_left_intro">
              김태우코딩연구소 대표, 성신대 융합보안공학과 겸임교수
            </header>
            <header className="header_left_introduce">안녕하세요,</header>
            <header className="header_left_introduce">김태우입니다.</header>

            <div className="header_left_introduce_body_container mt-3">
              <span className="header_left_introduce_body">
                안녕하세요. 김태우코딩연구소의 김태우입니다.
              </span>
              <br />
              <span className="header_left_introduce_body">
                늘 새로운 개발에 대해 연구하는 것을 좋아하고
              </span>
              <br />
              <span className="header_left_introduce_body">
                개발자가 되기를 희망하는 청년들을 교육합니다.
              </span>
            </div>

            <div className="btn_header_container mt-4">
              <a
                href="https://blog.naver.com/jamsuham75"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn_header btnHover">블로그</button>
              </a>
              <a
                href="https://www.youtube.com/@jamsuham75"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn_header btnHover">유튜브</button>
              </a>
            </div>
          </Col>

          <Col md={6} className="text-center">
            <img
              src="/image/증명사진.jpg"
              alt="대표 이미지"
              className="img-fluid rounded shadow"
              style={{ maxWidth: "80%" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;
