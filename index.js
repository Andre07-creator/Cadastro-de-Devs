let buttonAddTechnology = document.getElementById("add-technology");
let form = document.getElementById("dev-cad");
let divShow = document.getElementById("show-techologies");
let showP = document.getElementById('showP')
let devList = [];
let i = 0;
buttonAddTechnology.addEventListener("click", function (ev) {
  ev.preventDefault();
  //referenciando a lista de tecnologias
  let stackInputs = document.getElementById("stack-inputs");
  //criando uma nova linha para salvar a tecnologia e o tempo de experiencia
  let newRow = document.createElement("li");
  //indice que serve para deixar cada elemento que for adicionado único
  let rowIndex = i;
  i++;
  //a nova linha recebe o indice
  newRow.id = "input-row" + rowIndex;
  //essa classe serve para referenciar a linha lá embaixo usando o quwryselectorAll
  newRow.className = "inputRows";
  //label e input de inserção da tecnologia
  let technologyName = document.createElement("label");
  technologyName.innerText = "Tecnologia";
  technologyName.htmlFor = "technologyName-" + rowIndex;
  let technologyNameIput = document.createElement("input");
  technologyNameIput.name = "technologyName";
  technologyNameIput.id = "technologyName-" + rowIndex;

  //Grupo de botões radio de escolha da experiencia
  //Primiro botão

  let experience0a2yearsLabel = document.createElement("label");
  experience0a2yearsLabel.innerText = "0-2 years";
  //o html for da label precisa ser igual o id da input
  experience0a2yearsLabel.htmlFor = "expRadio" + rowIndex + ".1";
  let experience0a2yearsInput = document.createElement("input");
  experience0a2yearsInput.id = "expRadio" + rowIndex + ".1";
  experience0a2yearsInput.type = "radio";
  experience0a2yearsInput.name = "experience-" + rowIndex;
  experience0a2yearsInput.value = "0-2 years";
  //Segundo botão
  let experience3a4yearsLabel = document.createElement("label");
  experience3a4yearsLabel.innerText = " 3-4 years";
  experience3a4yearsLabel.htmlFor = "expRadio" + rowIndex + ".2";
  let experience3a4yearsInput = document.createElement("input");
  experience3a4yearsInput.id = "expRadio" + rowIndex + ".2";
  experience3a4yearsInput.type = "radio";
  experience3a4yearsInput.name = "experience-" + rowIndex;
  experience3a4yearsInput.value = "3-4 years";
  //Terceito botão
  let experience5PlusyearsLabel = document.createElement("label");
  experience5PlusyearsLabel.innerText = " 5+ years ";
  experience5PlusyearsLabel.htmlFor = "expRadio" + rowIndex + ".3";
  let experience5PlusyearsInput = document.createElement("input");
  experience3a4yearsInput.id = "expRadio" + rowIndex + ".3";
  experience5PlusyearsInput.type = "radio";
  experience5PlusyearsInput.name = "experience-" + rowIndex;
  experience5PlusyearsInput.value = "5+ years";

  //botão de remoção
  let removeButton = document.createElement("button");
  removeButton.id = "remove-button";
  removeButton.innerText = "Excluir";
  //função que remove o elemento filho da lista de stackInputs
  removeButton.addEventListener("click", function () {
    stackInputs.removeChild(newRow);
  });
  divShow.removeChild(showP)
  newRow.append(
    technologyName,
    technologyNameIput,
    experience0a2yearsInput,
    experience0a2yearsLabel,
    experience3a4yearsInput,
    experience3a4yearsLabel,
    experience5PlusyearsInput,
    experience5PlusyearsLabel,
    removeButton
  );
  stackInputs.appendChild(newRow);
});

form.addEventListener("submit", function (ev) {
  ev.preventDefault();

  let fullName = document.getElementById("full-name").value;
  //aqui é utilizada a classe para pegar todos os elementos contidos em inputRows
  let inputRows = document.querySelectorAll(".inputRows");
  //é aqui onde vai ser inseridas as tecnologias coletadas pelo foreach logo abaixo
  let technologies = [];
  //quando pega a referencia do elemento com queryselectorAll ela vira tipo um array, mas não é
  //porem da pra utilizar o foreach como iteração
  inputRows.forEach(function (row) {
    let techName = document.querySelector(
      "#" + row.id + ' input[name="technologyName"]'
    ).value;
    let techExp = document.querySelector(
      "#" + row.id + ' input[type="radio"]:checked'
    ).value;
    technologies.push({ name: techName, exp: techExp });
  });
  const newDev = { fullName: fullName, technologies: technologies };
  devList.push(newDev);
  alert("Dev cadastrado com sucesso!!!");

  let registeredDevs = document.createElement("h3");
  let p = document.createElement("div");
  registeredDevs.htmlFor = "registeredDevs";
  registeredDevs.innerText = "Devs cadastrados";
  let showTechologies = "";
  devList.forEach(function (tech) {
    showTechologies +=
      "Nome: " +
      tech.fullName +
      "\n" +
      tech.technologies
        .map(function (t) {
          return "Tecnologia: " + t.name + " Experiência: " + t.exp + "\n";
        })
        .join("") +
      "\n";
  });

  p.innerText = showTechologies;
  p.id='showP'
  p.append(registeredDevs, p)
  document.getElementById("full-name").value = "";
  inputRows.forEach(function (row) {
    row.remove();
  });
  console.log(devList);
});
