import "./App.css";
import { useState, useEffect } from "react";
import ToolBar from "./components/ToolBar";
import Home from "./pages/Home";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const storedData = JSON.parse(localStorage.getItem("todos")) ?? [];
  const [todos, setTodos] = useState(storedData);
  const [todosFiltered, setTodosFiltered] = useState(todos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setTodosFiltered(todos);
  }, [todos]);

  const searchTodos = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm) {
      const regexPattern = new RegExp(`^${searchTerm}`);
      const filteredTodos = todos.filter((todo) =>
        regexPattern.test(todo.name)
      );
      setTodosFiltered(filteredTodos);
    } else {
      setTodosFiltered(todos);
    }
  };
  return (
    <div className="main-container">
      <Container>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col md={8}>
            <ToolBar />
          </Col>
        </Row>
      </Container>

      <Home
        setTodos={setTodos}
        searchTodos={searchTodos}
        todos={todosFiltered}
      />
    </div>
  );
}

export default App;
