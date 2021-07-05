import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Pagination } from "antd";
import cx from "classnames";
import { Scrollbar } from "~components";
import { chunk } from "~utils/helper";

export default ({ name, value, onChange }) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("background-1.png");
  const [page, setPage] = useState(1);

  /**
   * 内置图片
   */
  const DEFINE_BACKGROUND = [
    "background-1.png",
    "background-2.png",
    "background-3.png",
    "background-4.png",
    "background-5.png",
    "background-6.png",
    "background-7.png",
    "background-8.png",
    "background-9.png",
    "background-10.png",
    "background-11.png",
    "background-12.png",
    "background-13.png",
    "background-14.png",
    "background-15.png",
    "background-16.png",
    "background-17.jpg",
    "background-18.jpg",
    "background-19.jpg",
    "background-20.jpg",
    "background-21.jpg",
    "background-22.jpg",
    "background-23.jpg",
    "background-24.jpg",
    "background-25.jpg",
    "background-26.jpg",
    "background-27.jpg",
    "background-28.jpg",
    "background-29.png"
  ];

  const lists = chunk(DEFINE_BACKGROUND, 9);

  const onCancel = () => {
    setVisible(false);
  };

  const onPicker = (val) => {
    setImage(val);
    setVisible(false);
    onChange(name, val);
  };

  const onChangePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    value && setImage(value);
  }, []);

  return (
    <>
      <Modal
        title="请选择图片"
        width={1000}
        forceRender={true}
        visible={visible}
        destroyOnClose={true}
        maskClosable={false}
        footer={
          <Pagination
            current={page}
            defaultPageSize={8}
            total={DEFINE_BACKGROUND.length}
            size="small"
            onChange={onChangePage}
          />
        }
        onCancel={onCancel}
      >
        <Scrollbar height={600}>
          <Row gutter={[20, 20]}>
            {lists[page - 1].map((o) => {
              return (
                <Col span={8} key={o}>
                  <div key={o} className={cx("bg-gallery", { "is-active": image == o })} onClick={() => onPicker(o)}>
                    <div
                      style={{
                        height: 230,
                        width: "100%",
                        background: `url(./static/templet/${o}) no-repeat center/contain`
                      }}
                    ></div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Scrollbar>
      </Modal>
      <div
        className="bg-container__bd"
        style={{
          background: `url(./static/templet/${image}) no-repeat center/contain`
        }}
        onClick={() => setVisible(true)}
      >
        <span className="bg-container__bd--tips">点击此处更换图片</span>
      </div>
    </>
  );
};
