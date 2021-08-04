
// emp function
function EmpEdit(id, username) {
    window.location.href='#updateEmp?id='+id;
    var catchid = document.getElementById('saveid');
    var updateusername = document.getElementById('updateusername');
    console.log(id, username);
    catchid.value = id;
    updateusername.value = username;
}

function Delete(id){
    var warning=confirm('Confirm to Delete ?');
    if(warning){
        window.location.href="/admin/userDelete?id="+id;
    }
}

function QueryEmployee(){
    var searchID=$("#searchemp").val();
    console.log(searchID);
    window.location.href="/admin/?id="+searchID;
}


//member function
function MemEdit(id,username){
    window.location.href='#updateMem?id='+id;
    var catchid=document.getElementById('saveMid');
    var updateMemname=document.getElementById('updateMemname');
    console.log(id,username);
    catchid.value=id;
    updateMemname.value=username;
}

function MemDelete(id){
    var warning=confirm('Confirm to Delete ?');
    if(warning){
        window.location.href="/admin/memberctl/MemDelete?id="+id;
    }
}

function QueryMember(){
    var searchid=$("#searchMem").val();
    console.log(searchid);
    window.location.href='/admin/memberctl/?id='+searchid;
}
//product function
function QueryProduct(){
    var searchid=$("#searchPro").val();
    console.log(searchid);
    window.location.href='/admin/productctl/?id='+searchid;
}
//order function

//orderdetail funciton