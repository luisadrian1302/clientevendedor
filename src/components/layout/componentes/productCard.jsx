import { Button, Card } from "react-bootstrap";

export const ProductCard = ({ image, title, price, discount, colors }) => (
    <Card className="mb-4 shadow-sm">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <del>${price.original}</del>
          <span className="text-success ms-2">
            ${price.discounted} - {discount}% OFF
          </span>
        </Card.Text>
        <div className="mb-3">
          {colors.map((color, idx) => (
            <Button
              key={idx}
              variant="outline-secondary"
              className="rounded-circle me-2"
              style={{ backgroundColor: color, width: "25px", height: "25px" }}
            />
          ))}
        </div>
        <Button variant="primary" size="sm">
          Modificar Producto
        </Button>
      </Card.Body>
    </Card>
  );