const personalInfoForm = document.querySelector(".form form"),
  planForm = document.querySelector(".PlanContainer form"),
  pickAddonsForm = document.querySelector(".Pick-add-ons form"),
  Pages = document.querySelectorAll(".formSection>div>div"),
  StepNumbers = document.querySelectorAll(".stepNum"),
  backBtn = document.querySelector(".back"),
  nextBtn = document.querySelector(".btn"),
  btnContainer = document.querySelector(".NextBackButtonContainer"),
  toggler = document.querySelector("#durationToggle"),
  price = document.querySelectorAll(".price"),
  month = document.querySelector(".PlanDuration>span:first-child"),
  year = document.querySelector(".PlanDuration>span:last-child"),
  pick_add_ons_price = document.querySelectorAll(
    ".Pick-add-ons form label >div:last-child"
  ),
  subscriptionAndSelection = document.querySelector(
    ".subscriptionAndSelection"
  ),
  planName = document.querySelector(".planName"),
  planCost = document.querySelector(".planCost"),
  addOnsContainer = document.querySelector(
    ".subscriptionAndSelection > div:last-child "
  ),
  totalCost = document.querySelector(".totalCost"),
  change = document.querySelector(".change");

/* <div>
  <span class="selectedService">Online service</span>
  <span class="cost">+$10/yr</span>
</div>; */

const dataStorage = {};
const cost = {};
let duration = "monthly";
let currentPage = 1;

function hideBackBtn() {
  backBtn.style.display = "none ";
  btnContainer.style.justifyContent = "end";
}

function showBackBtn() {
  backBtn.style.display = "flex ";
  btnContainer.style.justifyContent = "space-between";
}

function hideNextBtn() {
  nextBtn.style.display = "none";
}

hideBackBtn();

function slideNextPage() {
  const nextPage = ++currentPage;
  Pages.forEach((page) => {
    const pageStepNo = +page.dataset.stepNo;

    if (pageStepNo === nextPage) {
      page.style.display = "flex";
      if (pageStepNo === 2) {
        showBackBtn();
      } else if (pageStepNo === 5) {
        hideBackBtn();
        hideNextBtn();
      }
    } else {
      page.style.display = "none";
    }
  });
}

function slidePreviousPage() {
  const previousPage = --currentPage;
  Pages.forEach((page) => {
    const pageStepNo = +page.dataset.stepNo;

    if (pageStepNo === previousPage) {
      page.style.display = "flex";
      if (pageStepNo == 1) {
        hideBackBtn();
      }
    } else {
      page.style.display = "none";
    }
  });
}

function changeStep() {
  for (let i = 0; i < StepNumbers.length; i++) {
    if (currentPage === i + 1) {
      StepNumbers[i].style.backgroundColor = "var(--Pastel-blue)";
      StepNumbers[i].style.color = "var(--Marine-blue)";
    } else {
      StepNumbers[i].style.backgroundColor = "var(--Purplish-blue)";
      StepNumbers[i].style.color = "var(--Alabaster)";
    }
  }
}

nextBtn.addEventListener("click", () => {
  if (currentPage == 1 && !personalInfoForm.checkValidity()) {
    return;
  } else if (currentPage == 1 && personalInfoForm.checkValidity()) {
    const inputs = document.querySelectorAll(".form form input");
    console.log(inputs);
    const personalInfo = {};
    inputs.forEach((input) => {
      personalInfo[input.id] = input.value;
    });
    dataStorage["PersonalInformation"] = personalInfo;
    console.log(dataStorage);
  }
  if (currentPage == 2 && !planForm.checkValidity()) {
    return;
  } else if (currentPage == 2 && planForm.checkValidity()) {
    const input = document.querySelector(".PlanContainer form input:checked");
    const plan = {};
    plan[input.name] = input.value;

    plan["cost"] =
      duration === "monthly"
        ? input.dataset.monthlyCost
        : input.dataset.yearlyCost;
    dataStorage["PlanChosen"] = plan;
    cost["PlanCost"] = plan["cost"];
  }
  if (currentPage == 3) {
    const inputs = document.querySelectorAll(
      ".Pick-add-ons form input:checked"
    );
    addOnsContainer.innerHTML = "";

    let addonsCost = [];
    inputs.forEach((input) => {
      addOnsContainer.innerHTML += `
      <div>
      <span class="selectedService">${input.name}</span>
      <span class="cost">+$${
        duration === "monthly"
          ? input.dataset.monthlyCost
          : input.dataset.yearlyCost
      }/yr</span>
      </div>
      `;
      addonsCost.push(
        duration === "monthly"
          ? input.dataset.monthlyCost
          : input.dataset.yearlyCost
      );
      //add addons cost
    });
    cost["addOnsCost"] = addonsCost;

    planName.textContent = dataStorage.PlanChosen.plan;
    planCost.textContent = dataStorage.PlanChosen.cost;

    // calculate total cost
    console.log(cost);

    totalCost.textContent = `+$
    ${[cost["PlanCost"], ...cost["addOnsCost"]].reduce((totalCost, cost) => {
      return +totalCost + +cost;
    })}
    ${duration == "monthly" ? "/mo" : "/yr"}`;
  }
  slideNextPage();
  changeStep();
});

backBtn.addEventListener("click", () => {
  slidePreviousPage();
  changeStep();
});

toggler.addEventListener("change", (e) => {
  const input = e.target;
  if (input.checked == true) {
    duration = "yearly";
    price[0].innerHTML =
      "$90/yr <br><span class='extraMonth'> 2 months free</span>";
    price[1].innerHTML =
      "$120/yr  <br><span class='extraMonth'> 2 months free</span>";
    price[2].innerHTML =
      "$150/yr  <br><span class='extraMonth'> 2 months free</span>";
    year.style.color = "var(--Marine-blue)";
    month.style.color = "var(--Cool-gray)";

    pick_add_ons_price[0].textContent = "$10/yr";
    pick_add_ons_price[1].textContent = "$20/yr";
    pick_add_ons_price[2].textContent = "$20/yr";
    console.log(pick_add_ons_price);
  } else {
    duration = "monthly";

    price[0].textContent = "$9/mo";
    price[1].textContent = "$12/mo";
    price[2].textContent = "$15/mo";

    year.style.color = "var(--Cool-gray)";
    month.style.color = "var(--Marine-blue)";
    pick_add_ons_price[0].textContent = "$1/mo";
    pick_add_ons_price[1].textContent = "$2/mo";
    pick_add_ons_price[2].textContent = "$2/mo";
  }
});

change.addEventListener("click", () => {
  currentPage = 1;
  slideNextPage();
  changeStep();
});
