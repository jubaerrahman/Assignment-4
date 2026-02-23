let interviewList = []
let rejectedList = []


let totalCount = document.getElementById('total-count')
let interviewCount = document.getElementById('interview-count')
let rejectedCount = document.getElementById('rejected-count')
let cardContainer = document.getElementById('card-container')

const totalFilterBtn = document.getElementById('total-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')
let mainContainer = document.querySelector('main')




function calculateCount(){
    totalCount.innerText = cardContainer.children.length
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length

}
function toggleStyle(id){
    interviewFilterBtn.classList.remove('bg-[#3B82F6]','text-white')
    totalFilterBtn.classList.remove('bg-[#3B82F6]','text-white')
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]','text-white')

    totalFilterBtn.classList.add('bg-white', 'text-[#64748B]')
    interviewFilterBtn.classList.add('bg-white','text-[#64748B]')
    rejectedFilterBtn.classList.add('bg-white','text-[#64748B]')

    const selected = document.getElementById(id)
    selected.classList.remove('bg-white','text-[#64748B]')
     selected.classList.add('bg-[#3B82F6]','text-white')
    //  console.log("Button clicked:", id);

}
calculateCount()