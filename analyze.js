
const fs=require('fs');
let str=fs.readFileSync('/var/log/apt/history.log','utf8');


let install_packages=()=>{
let patt1 = /Install:(.*)/g;
let match=str.match(patt1);
let new_match=[];

match.forEach((ele,i)=>{

    match[i]=ele.replace("Install: ","");
    if(match[i].match(/automatic/))     
        new_match=new_match.concat(match[i].trim().split('),'));
    else
        new_match=new_match.concat(match[i].trim().split(','));
});
new_match.forEach((ele,i)=>{
    new_match[i]=ele.replace(' ','');
});
    return new_match;
}
let removed_packages=()=>{
    let patt1 = /Remove:(.*)/g;
    let match=str.match(patt1);
    let new_match=[];
    
    match.forEach((ele,i)=>{
    
        match[i]=ele.replace("Remove: ","");
        if(match[i].match(/automatic/))     
            new_match=new_match.concat(match[i].trim().split('),'));
        else
            new_match=new_match.concat(match[i].trim().split(','));
    });
    new_match.forEach((ele,i)=>{
        new_match[i]=ele.replace(' ','');
    });
        return new_match;
    
}

if(process.argv[2]=='ls')
    console.log(install_packages());
else if(process.argv[2]=='removed')
    console.log(removed_packages());
else
    console.log(`  usage:
    aptlog <function>

    commands can be:

    ls : list the installed apt packages
    removed : list the removed packages
`);
