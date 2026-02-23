let interviewList = [];
let rejectedList = [];
let currentStatus = "total";

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
let cardContainer = document.getElementById("card-container");
let filterSection = document.getElementById("filtered-section");
const totalFilterBtn = document.getElementById("total-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");
let mainContainer = document.querySelector("main");

function calculateCount() {
  totalCount.innerText = cardContainer.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
function toggleStyle(id) {
  interviewFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
  totalFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
  rejectedFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");

  totalFilterBtn.classList.add("bg-white", "text-[#64748B]");
  interviewFilterBtn.classList.add("bg-white", "text-[#64748B]");
  rejectedFilterBtn.classList.add("bg-white", "text-[#64748B]");

  const selected = document.getElementById(id);
  currentStatus = id;
  selected.classList.remove("bg-white", "text-[#64748B]");
  selected.classList.add("bg-[#3B82F6]", "text-white");
  //  console.log("Button clicked:", id);

  if (id == "interview-filter-btn") {
    filterSection.classList.remove("hidden");
    cardContainer.classList.add("hidden");
    renderInterview();
  } else if (id == "total-filter-btn") {
    filterSection.classList.add("hidden");
    cardContainer.classList.remove("hidden");
  } else if (id == "rejected-filter-btn") {
    filterSection.classList.remove("hidden");
    cardContainer.classList.add("hidden");
    renderRejected();
  }
}

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    // console.log(parentNode)
    const companyName = parentNode.querySelector(".company-name").innerText;
    const positionName = parentNode.querySelector(".position-name").innerText;
    const place = parentNode.querySelector(".place").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;
    parentNode.querySelector(".status").innerText = "Interviewing";

    const cardInfo = {
      companyName,
      positionName,
      place,
      status: "Interviewing",
      notes,
    };
    console.log(cardInfo);

    const Exist = interviewList.find(
      (item) => item.companyName == cardInfo.companyName,
    );

    if (!Exist) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter(
      (item) => item.companyName != cardInfo.companyName,
    );
    if (currentStatus == "rejected-filter-btn") {
      renderRejected();
    }
    // renderInterview()
    calculateCount();
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    // console.log(parentNode)
    const companyName = parentNode.querySelector(".company-name").innerText;
    const positionName = parentNode.querySelector(".position-name").innerText;
    const place = parentNode.querySelector(".place").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;
    parentNode.querySelector(".status").innerText = "Rejected";

    const cardInfo = {
      companyName,
      positionName,
      place,
      status: "Rejected",
      notes,
    };
    console.log(cardInfo);

    const Exist = rejectedList.find(
      (item) => item.companyName == cardInfo.companyName,
    );

    if (!Exist) {
      rejectedList.push(cardInfo);
    }
    interviewList = interviewList.filter(
      (item) => item.companyName != cardInfo.companyName,
    );

    if (currentStatus == "interview-filter-btn") {
      renderInterview();
    }
    // renderRejected()
    calculateCount();
  } else if (event.target.classList.contains("delete-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    parentNode.remove();
    const companyName = parentNode.querySelector(".company-name").innerText;

    interviewList = interviewList.filter(
      (item) => item.companyName !== companyName,
    );
    rejectedList = rejectedList.filter(
      (item) => item.companyName !== companyName,
    );
    
    calculateCount();
  } else if (event.target.classList.contains("fa-trash-can")) {
    const parentNode = event.target.parentNode.parentNode.parentNode;
    const companyName = parentNode.querySelector(".company-name").innerText;

    interviewList = interviewList.filter(
      (item) => item.companyName !== companyName,
    );
    rejectedList = rejectedList.filter(
      (item) => item.companyName !== companyName,
    );
    parentNode.remove();
    calculateCount();
  }
});
function renderEmptySpace() {
  filterSection.innerHTML = `<div class="flex flex-col items-center justify-center py-16">
            <img src="./jobs.png" 
                 class="w-24 mb-4 ">
            <h3 class="text-xl font-semibold text-[#002C5C]">
                No jobs Available
            </h3>
            <p class="text-sm text-gray-500 mt-2">
                You haven't added any jobs in this category yet.
            </p>
        </div>
`;
}
function renderInterview() {
  filterSection.innerHTML = "";

  if (interviewList.length == 0) {
    renderEmptySpace();
    return;
  }

  for (let i of interviewList) {
    let div = document.createElement("div");
    div.classList.add(
      "card",
      "flex",
      "justify-between",
      "my-3",
      "bg-white",
      "rounded-xl",
      "px-3",
      "py-2",
    );
    div.innerHTML = `<div>
                <div>
                    <p class="company-name text-[#002C5C] font-semibold text-[20px]">${i.companyName}</p>
                    <p class="position-name text-[#64748B] font-normal">${i.positionName}</p>
                </div>

                <div>
                    <p class="place text-[#64748B] font-normal text-sm my-4">${i.place}</p>
                </div>

                <div>
                    <p class="status bg-[#EEF4FF] text-[#002C5C] inline p-2 rounded-1xl">${i.status}</p>
                    <p class="notes my-3 text-[12px] ">${i.notes}</p>

                </div>

                <div class="space-x-1.5">
                    <button
                        class="interview-btn text-lime-500 border-2 px-4 py-2 rounded-xl hover:cursor-pointer ">Interview</button>
                    <button
                        class="rejected-btn text-red-400 border-2 px-4 py-2 rounded-xl hover:cursor-pointer ">Rejected</button>
                </div>
            </div>
            <div>
                <button class="delete-btn border-2 p-2 rounded-4xl hover:cursor-pointer"><i
                        class="fa-solid fa-trash-can"></i></button>
            </div>`;

    filterSection.appendChild(div);
  }
}

function renderRejected() {
  filterSection.innerHTML = "";
  if (rejectedList.length === 0) {
    renderEmptySpace();
    return;
  }

  for (let i of rejectedList) {
    let div = document.createElement("div");
    div.classList.add(
      "card",
      "flex",
      "justify-between",
      "my-3",
      "bg-white",
      "rounded-xl",
      "px-3",
      "py-2",
    );
    div.innerHTML = `<div>
                <div>
                    <p class="company-name text-[#002C5C] font-semibold text-[20px]">${i.companyName}</p>
                    <p class="position-name text-[#64748B] font-normal">${i.positionName}</p>
                </div>

                <div>
                    <p class="place text-[#64748B] font-normal text-sm my-4">${i.place}</p>
                </div>

                <div>
                    <p class="status bg-[#EEF4FF] text-[#002C5C] inline p-2 rounded-1xl">${i.status}</p>
                    <p class="notes my-3 text-[12px] ">${i.notes}</p>

                </div>

                <div class="space-x-1.5">
                    <button
                        class="interview-btn text-lime-500 border-2 px-4 py-2 rounded-xl hover:cursor-pointer ">Interview</button>
                    <button
                        class="rejected-btn text-red-400 border-2 px-4 py-2 rounded-xl hover:cursor-pointer ">Rejected</button>
                </div>
            </div>
            <div>
                <button class="delete-btn border-2 p-2 rounded-4xl hover:cursor-pointer"><i
                        class="fa-solid fa-trash-can"></i></button>
            </div>`;

    filterSection.appendChild(div);
  }
}
calculateCount();
