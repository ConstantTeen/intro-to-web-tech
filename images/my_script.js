const bitmap_btn = document.getElementById('bitmap_btn');
const bitmap_img = document.getElementById('bitmap_img');
const bitmap_img_src = bitmap_img.src;

bitmap_btn.addEventListener('click',()=>{
    let src = bitmap_img.src;

    if(src === bitmap_img_src){
        bitmap_img.src = "notexists";
    }else{
        bitmap_img.src = bitmap_img_src;
    }
})