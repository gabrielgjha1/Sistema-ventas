export  class Usuario{

    constructor(
       public email:String,
       public password:String,
       public nombre?:String,
       public direccion?:String,
       public rol?:String
    ){}

}