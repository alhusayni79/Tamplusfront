import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ServiceCard from "./ServiceCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/Slices/services/serviceSlice";

const Services = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {services?.response?.data.map((data, index) => (
          <Grid item xs={6} sm={3} lg={3} key={index}>
            <ServiceCard {...data} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
