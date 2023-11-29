import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, Spinner } from 'react-bootstrap';

function SelectionBox({ source, dataKey, exhibitionField, selectFunction }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState([]);

  function filterAndCapitalizeName(array) {
    return array.filter((item, index, self) => {
      return self.findIndex((el) => el.name === item.name) === index
    });
  }

  useEffect(() => {

    const fetchData = async () => {
      let response = await fetch(source, { method: "GET" })
      let result = await response.json();
      let newList = filterAndCapitalizeName(result)
      setData(newList)

    }

    fetchData()
  }, [source])


  if (data.length === 0) {
    return <Spinner />
  }

  return (
    <Container>
      <Row md={12}>
        <Col>
          <Form.Select
            defaultValue={''}
            required
            value={selectedValue}
            onChange={(e) => {
              setSelectedValue(e.target.value);
              selectFunction(e.target.value);
            }}
          >
            <option value={''}>Selecione uma opção</option>
            {data.map((item) => (
              <option
                value={item[exhibitionField].charAt(0).toUpperCase() + item[exhibitionField].slice(1)}
                key={item[dataKey]}
                defaultValue={"Selecione um medicamento"}
              >
                {item[exhibitionField].charAt(0).toUpperCase() + item[exhibitionField].slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}

export default SelectionBox;
