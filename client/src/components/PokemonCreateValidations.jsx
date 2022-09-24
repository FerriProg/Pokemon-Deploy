export function validate(input, typeRepeatedFlag, maxTypesReached) {
    let errors={};

    if (!input.name) errors.name = 'Name cannot be blank';
    else if (!/^[A-Za-z\s]+$/g.test(input.name)) errors.name = 'Only letters allowed';
    else if (input.name.length < 2 || input.name.length > 15) errors.name ='Name must be between 2 and 15 characters';            
    
    //hp no es un campo obligatorio.
    if (input.hp && isNaN(input.hp)) errors.hp = 'Only numbers allowed';
    else if (/[  +]$/.test(input.hp)) errors.hp = 'Only numbers allowed';
    else if (!Number.isInteger(Number(input.hp))) errors.hp = 'Only integer numers allowed';
    else if (input.hp && (parseInt(input.hp) < 0 || parseInt(input.hp) > 255)) errors.hp = 'HP must be between 0 and 255'
    
    //attack no es un campo obligatorio.
    if (input.attack && isNaN(input.attack)) errors.attack = 'Only numbers allowed';
    else if (/[  +]$/.test(input.attack)) errors.attack = 'Only numbers allowed';
    else if (!Number.isInteger(Number(input.attack))) errors.attack = 'Only integer numers allowed';
    else if (input.attack && (parseInt(input.attack) < 0 || parseInt(input.attack) > 255)) errors.attack = 'Attack must be between 0 and 255'
    
    //defense no es un campo obligatorio.
    if (input.defense && isNaN(input.defense)) errors.defense = 'Only numbers allowed';
    else if (/[  +]$/.test(input.defense)) errors.defense = 'Only numbers allowed';
    else if (!Number.isInteger(Number(input.defense))) errors.defense = 'Only integer numers allowed';
    else if (input.defense && (parseInt(input.defense) < 0 || parseInt(input.defense) > 255)) errors.defense = 'Defense must be between 0 and 255'
    
    //speed no es un campo obligatorio.
    if (input.speed && isNaN(input.speed)) errors.speed = 'Only numbers allowed';
    else if (/[  +]$/.test(input.speed)) errors.speed = 'Only numbers allowed';
    else if (!Number.isInteger(Number(input.speed))) errors.speed = 'Only integer numers allowed';
    else if (input.speed && (parseInt(input.speed) < 0 || parseInt(input.speed) > 255)) errors.speed = 'Speed must be between 0 and 255'
    
    //height no es un campo obligatorio.
    if (input.height && isNaN(input.height)) errors.height = 'Only numbers allowed';
    else if (/[  +]$/.test(input.height)) errors.height = 'Only numbers allowed';
    else if (!Number.isInteger(Number(input.height))) errors.height = 'Only integer numers allowed';
    else if (input.height && (parseInt(input.height) < 0 || parseInt(input.height) > 1000)) errors.height = 'Height must be between 0 and 1000'
    
    //weight no es un campo obligatorio.
    if (input.weight && isNaN(input.weight)) errors.weight = 'Only numbers allowed';
    else if (/[  +]$/.test(input.weight)) errors.weight = 'Only numbers allowed';
    else if (!Number.isInteger(Number(input.weight))) errors.weight = 'Only integer numers allowed';
    else if (input.weight && (parseInt(input.weight) < 0 || parseInt(input.weight) > 1000)) errors.weight = 'Weight must be between 0 and 1000'
    
    if (input.image) {
        const fileExtension = input.image.split(/\.(?=[^\.]+$)/).pop();
        const permittedExtensions = ['png', 'gif', 'webp', 'jpeg', 'jpg', 'svg'];
        if (!(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg)\??.*$/gmi).test(input.image)) errors.image = 'It must be an URL image';
        else if (!permittedExtensions.includes(fileExtension)) errors.image = 'Only images in png/gif/webp/jpeg/jpg/svg allowed'
    }
    
    if (typeRepeatedFlag) errors.types = 'You tried to add a repeated type';
    if (maxTypesReached) errors.types = 'Max types allowed: 4';
    
    return errors
}