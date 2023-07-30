let clickBtn = document.querySelector("#clickBtn");

clickBtn.addEventListener("click", function(){
    const Arrays = [2,2,2,3,4,3,3,2,8,8,7,7,2,4];
    const removeDuplicate = new Set(Arrays);
    let newArray = Array.from(removeDuplicate);
    console.log(newArray);
});