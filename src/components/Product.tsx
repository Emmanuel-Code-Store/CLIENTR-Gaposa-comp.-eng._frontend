import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

interface ProductCardProps {
  title: string;
  image: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, description }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Button size="small">Add to Cart</Button>
    </Card>
  );
};

const ProductList: React.FC = () => {
  const products = [
    {
      title: 'Product 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description of product 1',
    },
    {
      title: 'Product 2',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description of product 2',
    },
    
  ];

  return (
    <Grid container spacing={2}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
