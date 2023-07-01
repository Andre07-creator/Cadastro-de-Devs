//este form serve para utilizar a parte de salvar em uma lista somente utilizando um
//botão do tipo submit
let form = document.getElementById("dev-cad");
//pega o botão para adicionar tecnologias que o dev possui experiencia
let addTechnology = document.getElementById("add-technology");
//indice feito para que cada id das tecnologias e de um novo usuário sejam unicas
// e para poder utilizar o foreach com o intuito de inserir na lista que o form salva
let i = 0;
//lista criada para armazenar os devs que o form salva
let devList = [];
//funcões que tem o intuito de poupar tempo e deixar o codigo mais limpo sem a necesidade
//de fazer varios creates
//////////////////////////
function label(text, htmlfor) {
  const createLabel = document.createElement("label");
  createLabel.innerText = text;
  createLabel.htmlFor = htmlfor;
  return createLabel;
}
function input(id, name, type = "text", value = "", placeholder = "") {
  const createInput = document.createElement("input");
  createInput.id = id;
  createInput.name = name;
  createInput.type = type;
  createInput.value = value;
  createInput.placeholder = placeholder;
  return createInput;
}
///////////////////////////////

//adicionando evento ao botão que salva uma nova tecnologia ao dev
addTechnology.addEventListener("click", function (ev) {
  ev.preventDefault();
  //referencias ao id da ul criada no html
  let ulRow = document.getElementById("new-technology");
  //cria uma nova li para ser adicionada ao ul
  let liRow = document.createElement("li");
  //variavel auxiliar que recebe o indice de id
  let indexRow = i;
  i++;
  //dando um id proprio para cada li
  liRow.id = "liRow-" + indexRow;
  //classe adicionada ao li para pode utilizar o queryselectorall mais tarde
  liRow.className = "liRow";
  //Input do nome da tecnologia
  let techNameLabel = label("Nome: ", "techName-" + indexRow);
  //repare que cada elemento recebe um id unico
  let techNameInput = input("techName-" + indexRow, "techName");

  //Grupo de botões radio para escolha da experiência
  //Botão 1
  let button1 = input(
    "experience-" + indexRow + ".1",
    "experience" + indexRow,
    "radio",
    "0-2 anos"
  );
  let label1 = label("0-2 anos", "experience-" + indexRow + ".1");
  //Botão 2
  let button2 = input(
    "experience-" + indexRow + ".2",
    "experience" + indexRow,
    "radio",
    "3-4 anos"
  );
  let label2 = label("3-4 anos", "experience-" + indexRow + ".2");
  //Botão 3
  let button3 = input(
    "experience-" + indexRow + ".3",
    "experience" + indexRow,
    "radio",
    "5+ anos"
  );
  let label3 = label("5+ anos", "experience-" + indexRow + ".3");
  //botão de deletar a linha
  let deleteButton = document.createElement("button");
  deleteButton.id = "delete" + indexRow;
  deleteButton.innerText = "Excluir";
  deleteButton.addEventListener("click", function () {
    ulRow.removeChild(liRow);
  });
  //adicionando os elementos na li
  liRow.append(
    techNameLabel,
    techNameInput,
    button1,
    label1,
    button2,
    label2,
    button3,
    label3,
    deleteButton
  );
  //adicionando a li na ul
  ulRow.appendChild(liRow);
});
//aqui é utilizado o form principal do tipo submit
form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  //array criada para a inserção das tecnologias
  let technologies = [];
  //pega o elemento do nome completo do dev lá do html
  let fullName = document.getElementById("full-name").value;
  //aqui é onde a classe do liRow é utilizada através do queryselectorall que pega uma
  //coleção de elementos com a mesma classe
  let liRow = document.querySelectorAll(".liRow");
  //foreach que utiliza do queryselectorall que pega um conjunto de elementos, mas não
  //é uma lista de array
  liRow.forEach(function (row) {
    //pega o id e juntamente com o nome do elemento
    let techName = document.querySelector(
      "#" + row.id + ' input[name="techName"]'
    ).value;
    //pega o id e a experiencia que está marcada 
    let experience = document.querySelector(
      "#" + row.id + ' input[type="radio"]:checked'
    ).value;
    //um push para o array de tecnologia em forma de objeto
    technologies.push({ name: techName, experience: experience });
  });
  //um push para o array principal incluindo o nome e a lista de tecnologias que o dev
  //domina e, forma de objeto
  devList.push({ fullname: fullName, technologies: technologies });
  console.log(devList);
  document.getElementById("full-name").value = "";
  //limpa toda a lista de nome de tecnologias e botões radio que está contida no liRow
  liRow.forEach(function (row) {
    row.remove();
  });
});
