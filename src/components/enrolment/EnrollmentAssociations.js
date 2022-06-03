import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

//Using Hooks.
export default function EnrollmentAssociations(props) {
  return props.associations.map((association, index) => {
    return (
      <Button
        variant="contained"
        style={{
          marginRight: "10px",
          marginBottom: "5px",
          textTransform: "none",
          backgroundColor: "#e8e8e9",
        }}
        startIcon={props.canDelete ? <DeleteIcon /> : null}
        key={association.id}
        onClick={props.canDelete ? () => props.clicked(index) : null}
      >
        {association.name}
      </Button>
    );
  });
}
