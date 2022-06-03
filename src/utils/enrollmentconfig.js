//Facultades
export const faculties = [
  {
    id: "bb3c5e99-327a-4681-a830-b799eb62f7e6",
    name: "Facultad de Informática",
    universityId: "d53cf03a-f913-4677-a589-489741776ab9",
  },
  {
    id: "754bc81e-c54f-434a-8fb9-34af1433dddb",
    name: "Facultad de Trabajo Social",
    universityId: "d53cf03a-f913-4677-a589-489741776ab9",
  },
];

//Titulaciones
export const studies = [
  {
    id: "baf7d716-6509-40a7-95cc-e0e7aed2b221",
    name: "Grado Administración y Dirección de Empresas",
    type: "81ad4059-d714-4a56-8636-11841b84abac",
    faculty: "bb3c5e99-327a-4681-a830-b799eb62f7e6",
  },
  {
    id: "2bae6a41-58b7-4049-9202-07ba986ddbfb",
    name: "Grado Desarrollo de Videojuegos",
    type: "81ad4059-d714-4a56-8636-11841b84abac",
    faculty: "bb3c5e99-327a-4681-a830-b799eb62f7e6",
  },
  {
    id: "d4b3e989-dfc4-48ad-bad1-fe2af17d5710",
    name: "Grado Ingeniería de Computadores",
    type: "81ad4059-d714-4a56-8636-11841b84abac",
    faculty: "bb3c5e99-327a-4681-a830-b799eb62f7e6",
  },
  {
    id: "7abaf3a5-54c1-4073-b20e-6fbcd27543f1",
    name: "Grado Ingeniería del Software",
    type: "81ad4059-d714-4a56-8636-11841b84abac",
    faculty: "bb3c5e99-327a-4681-a830-b799eb62f7e6",
  },
  {
    id: "421d6a64-791e-4fde-8830-b2fef24b12e1",
    name: "Grado Trabajo Social",
    type: "81ad4059-d714-4a56-8636-11841b84abac",
    faculty: "754bc81e-c54f-434a-8fb9-34af1433dddb",
  },
  {
    id: "ae42e2fe-c9e8-4382-9d3a-3c8f451383f0",
    name: "Máster Estudios LGBTIQ+",
    type: "e04eedb1-3150-46ef-9b97-e7fc64293a19",
    faculty: "754bc81e-c54f-434a-8fb9-34af1433dddb",
  },
  {
    id: "bbf7dae0-9f4a-4083-97fb-7df66a490eed",
    name: "Máster Trabajo Social Comunitario, Gestión y Ev. Servicios Soc.",
    type: "e04eedb1-3150-46ef-9b97-e7fc64293a19",
    faculty: "754bc81e-c54f-434a-8fb9-34af1433dddb",
  },
];

//Tipos de estudio
export const studyType = [
  {
    id: "81ad4059-d714-4a56-8636-11841b84abac",
    name: "Grado",
  },
  {
    id: "e04eedb1-3150-46ef-9b97-e7fc64293a19",
    name: "Máster",
  },
  {
    id: "fc8ad504-4a3c-4299-add6-8f12ac123387",
    name: "Doble grado",
  },
  {
    id: "c7d097c5-6922-4ff3-9a7a-cb6274c2de90",
    name: "Posgrado",
  },
];

//Cursos
export const courses = [
  {
    id: "coursefdi0101",
    name: "1º",
    study: "baf7d716-6509-40a7-95cc-e0e7aed2b221",
    course: "334D6954-7A1F-4D09-A741-8C2D17432D3A",
  },
  {
    id: "coursefdi0102",
    name: "2º",
    study: "baf7d716-6509-40a7-95cc-e0e7aed2b221",
    course: "3C0E1642-A041-404A-A869-26D40B8FAB88",
  },
  {
    id: "coursefdi0103",
    name: "3º",
    study: "baf7d716-6509-40a7-95cc-e0e7aed2b221",
    course: "A0CA2B29-1340-42D8-B26A-701727C9E209",
  },
  {
    id: "coursefdi0104",
    name: "4º",
    study: "baf7d716-6509-40a7-95cc-e0e7aed2b221",
    course: "EBBD1E74-BEE0-4267-9A76-90DD32635B9B",
  },
  {
    id: "coursefdi0105",
    name: "5º",
    study: "baf7d716-6509-40a7-95cc-e0e7aed2b221",
    course: "84B2E4AE-B8D2-4AE3-9E92-1928AF73842B",
  },
  {
    id: "coursefdi0201",
    name: "1º",
    study: "2bae6a41-58b7-4049-9202-07ba986ddbfb",
    course: "334D6954-7A1F-4D09-A741-8C2D17432D3A",
  },
  {
    id: "coursefdi0202",
    name: "2º",
    study: "2bae6a41-58b7-4049-9202-07ba986ddbfb",
    course: "3C0E1642-A041-404A-A869-26D40B8FAB88",
  },
  {
    id: "coursefdi0203",
    name: "3º",
    study: "2bae6a41-58b7-4049-9202-07ba986ddbfb",
    course: "A0CA2B29-1340-42D8-B26A-701727C9E209",
  },
  {
    id: "coursefdi0204",
    name: "4º",
    study: "2bae6a41-58b7-4049-9202-07ba986ddbfb",
    course: "EBBD1E74-BEE0-4267-9A76-90DD32635B9B",
  },
  {
    id: "coursefdi0301",
    name: "1º",
    study: "d4b3e989-dfc4-48ad-bad1-fe2af17d5710",
    course: "334D6954-7A1F-4D09-A741-8C2D17432D3A",
  },
  {
    id: "coursefdi0302",
    name: "2º",
    study: "d4b3e989-dfc4-48ad-bad1-fe2af17d5710",
    course: "3C0E1642-A041-404A-A869-26D40B8FAB88",
  },
  {
    id: "coursefdi0303",
    name: "3º",
    study: "d4b3e989-dfc4-48ad-bad1-fe2af17d5710",
    course: "A0CA2B29-1340-42D8-B26A-701727C9E209",
  },
  {
    id: "coursefdi0304",
    name: "4º",
    study: "d4b3e989-dfc4-48ad-bad1-fe2af17d5710",
    course: "EBBD1E74-BEE0-4267-9A76-90DD32635B9B",
  },
  {
    id: "coursefdi0401",
    name: "1º",
    study: "7abaf3a5-54c1-4073-b20e-6fbcd27543f1",
    course: "334D6954-7A1F-4D09-A741-8C2D17432D3A",
  },
  {
    id: "coursefdi0402",
    name: "2º",
    study: "7abaf3a5-54c1-4073-b20e-6fbcd27543f1",
    course: "3C0E1642-A041-404A-A869-26D40B8FAB88",
  },
  {
    id: "coursefdi0403",
    name: "3º",
    study: "7abaf3a5-54c1-4073-b20e-6fbcd27543f1",
    course: "A0CA2B29-1340-42D8-B26A-701727C9E209",
  },
  {
    id: "coursefdi0404",
    name: "4º",
    study: "7abaf3a5-54c1-4073-b20e-6fbcd27543f1",
    course: "EBBD1E74-BEE0-4267-9A76-90DD32635B9B",
  },
  {
    id: "coursets0101",
    name: "1º",
    study: "421d6a64-791e-4fde-8830-b2fef24b12e1",
    course: "334D6954-7A1F-4D09-A741-8C2D17432D3A",
  },
  {
    id: "course0102",
    name: "2º",
    study: "421d6a64-791e-4fde-8830-b2fef24b12e1",
    course: "3C0E1642-A041-404A-A869-26D40B8FAB88",
  },
  {
    id: "course0103",
    name: "3º",
    study: "421d6a64-791e-4fde-8830-b2fef24b12e1",
    course: "A0CA2B29-1340-42D8-B26A-701727C9E209",
  },
  {
    id: "course0104",
    name: "4º",
    study: "421d6a64-791e-4fde-8830-b2fef24b12e1",
    course: "EBBD1E74-BEE0-4267-9A76-90DD32635B9B",
  },
  {
    id: "course0201",
    name: "1º",
    study: "ae42e2fe-c9e8-4382-9d3a-3c8f451383f0",
    course: "334D6954-7A1F-4D09-A741-8C2D17432D3A",
  },
  {
    id: "course0301",
    name: "1º",
    study: "bbf7dae0-9f4a-4083-97fb-7df66a490eed",
    course: "334D6954-7A1F-4D09-A741-8C2D17432D3A",
  },
];

//Asociaciones UCM
export const ucmAssociations = [
  {
    id: "3572d667-17c5-42e8-86f0-8039b94ba727",
    name: "ASCII",
    faculty: "bb3c5e99-327a-4681-a830-b799eb62f7e6",
  },
  {
    id: "4cd36170-0d9f-4aeb-94e9-e8b87187d3f6",
    name: "Diskóbolo",
    faculty: "bb3c5e99-327a-4681-a830-b799eb62f7e6",
  },
  {
    id: "fb82e868-984e-41fa-8217-6deb3fb1fd26",
    name: "LibreLab",
    faculty: "bb3c5e99-327a-4681-a830-b799eb62f7e6",
  },
  {
    id: "4f88ca65-2ca7-453b-aa58-33012124faed",
    name: "Ludic Association of Gamers (LAG)",
    faculty: "bb3c5e99-327a-4681-a830-b799eb62f7e6",
  },
  {
    id: "734e0ac4-9ca6-40f3-87d7-3e0e1dd99199",
    name: "Otros Facultad de Informática",
    faculty: "bb3c5e99-327a-4681-a830-b799eb62f7e6",
  },
  {
    id: "f3c482b6-3225-4da9-9bd4-7d835c69dc72",
    name: "Trabajo Social Crítico",
    faculty: "754bc81e-c54f-434a-8fb9-34af1433dddb",
  },
  {
    id: "73d84957-3fb0-4985-9ace-f9e3e565f379",
    name: "Xti",
    faculty: "754bc81e-c54f-434a-8fb9-34af1433dddb",
  },
  {
    id: "f193b6bc-ea5f-4ac5-8880-f7d75bf8cd67",
    name: "Zona IN - Asoc. Estudiantes Div. Funcional/Discapacidad",
    faculty: "754bc81e-c54f-434a-8fb9-34af1433dddb",
  },
  {
    id: "5c027857-21b5-4084-bc78-6a622fd6c117",
    name: "Otros Facultad de Trabajo Social",
    faculty: "754bc81e-c54f-434a-8fb9-34af1433dddb",
  },
];

//Asociaciones externas UCM
export const externalAssociations = [
  {
    id: "285287aa-be04-49ba-8d78-f157cc0f65ec",
    name: "Cáritas",
    category: "Voluntariado",
  },
  {
    id: "485fb593-8d4b-442c-bcf7-1887a2e1b512",
    name: "Cruz Roja",
    category: "Voluntariado",
  },
  {
    id: "5d4d2063-6163-4247-a9f4-d95bf6e417dd",
    name: "Unicef",
    category: "Voluntariado",
  },
  {
    id: "c31af9c2-d062-4cfd-9e7d-e6133f673071",
    name: "Otros",
    category: "Otros",
  },
];
