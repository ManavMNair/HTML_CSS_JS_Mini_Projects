const generateBtn = document.getElementById("Generate-btn")
const paletteContainer = document.getElementById("palette-container")
const target = document.querySelector(".copy-btn")

paletteContainer.addEventListener("click",copyColor)



generateBtn.addEventListener("click",generatePalette)



generatePalette()

// Generate Colorpalette

function generatePalette(){
    // console.log("palette generated")
    const colors = []
    for(let i = 0; i<5; i++){
        colors.push(generateColor())
    }
    // console.log(colors)
    updateColorPalette(colors)
}

function generateColor(){
    let color = "#"
    for(let i=0; i<6; i++){
        color += Math.floor(Math.random()*16).toString(16)
    }
    return color
}

function updateColorPalette(colors){
    const colorBoxes = document.querySelectorAll(".color-box")

    colorBoxes.forEach((box,index)=>{
        const color = colors[index]
        // console.log(color)
        const colorDiv = box.querySelector(".color")
        // console.log(colorDiv)
        const hexValue = box.querySelector(".hex-value")
        colorDiv.style.backgroundColor = color
        hexValue.textContent = color

    })
}


// Copy to Clipboard Functionality

function copyColor(e){
    // console.log(e.target)
    const target = e.target;
    
    if (target.classList.contains("copy-btn")) {
        const hexValue = target.closest(".color-box").querySelector(".hex-value").textContent;

        navigator.clipboard.writeText(hexValue)
            .then(() => copied(e.target))
            .catch(err => console.error("Failed to copy:", err));
    }else if (target.classList.contains("color")){
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent
        navigator.clipboard.writeText(hexValue)
            .then(() => copied(e.target.nextElementSibling.querySelector(".copy-btn")))
            .catch(err => console.error("Failed to copy:", err));

    }
}

function copied(target){
    target.classList.remove("fa-regular","fa-copy")
    target.classList.add("fa-solid" , "fa-check-double")
    target.style.color = "#2fb990"
    setTimeout(()=>{
        target.classList.remove("fa-solid" , "fa-check-double")
        target.classList.add("fa-regular","fa-copy")
        target.style.color = ""
    },1500)
}