import React, { useState } from "react";
import Medicines from "../formularios/FormMedicacoes";
import Pagina from "../templates/Pagina";
import { Container, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";


export default function TelaCadMedicacoes(props) {


    const location = useLocation();

    const [objectSelected, setObjectSelected] = useState({})
    const [medicineEditing, setMedicineEditing] = useState({
        pacientName: objectSelected,
        medicineName: "",
        medicineDosage: "",
        medicineHours: "",
        medicineHours2: "",
        medicineHours3: "",
        medicineDateStart: "",
        medicineDateEnd: "",
        medicineObservation: ""
    })


    return (
        <Pagina>
            <Container className="border m-6">
                <Alert variant={'secondary'} className="text-center m-3">
                    <font size="6">
                        <strong>Cadastro de Medicamentos</strong>
                    </font>
                </Alert>
                <Medicines
                    medicineEditing={medicineEditing}
                    setMedicineEditing={setMedicineEditing}
                    setObject={setObjectSelected}
                    location={location}
                />
            </Container>
        </Pagina>
    )
}