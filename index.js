
//Par defaut l'application commence en mode création
let isInEditionMode=false;
let indexEdition=null;
const savedProductListInLocalStorage = JSON.parse(localStorage.getItem('productList'));
const produitList = savedProductListInLocalStorage == null ? [] : savedProductListInLocalStorage

//je fais mes const pour mes inputs
const nomProduit = document.getElementById('name');
const quantitesProduit = document.getElementById('quantites');
const prixAchat = document.getElementById("prixAchat");
const prixVente = document.getElementById('prixVente');
const typeDeproduit = document.getElementById('type');
//je fais mes ref a mes buttons de modal pr pouvoir ouvrir et fermer le modal depuis js
const closeModal = document.getElementById('close');
const openModal=document.getElementById('openModal');
const tBody = document.getElementById('listProduit');
buildHtmlTable();
//je fais mon constructeur dans ma class produit, je l'instancie et je fais mes calcul ht et ttc a la volée
class Produit {
    constructor(nom, quantites, prixAchatHt, prixVenteHt, type) {

        this.nom = nom;
        this.quantites = parseInt(quantites);

        
        this.prixAchatHt = prixAchatHt;
        this.prixVenteHt = parseInt(prixVenteHt);
        this.prixVenteTtc = this.prixVenteHt + (10 * this.prixVenteHt) / 100
        this.type = type;
        this.marge = (this.prixVenteHt-this.prixAchatHt);

    }
}



function save() {
    const newProduit = new Produit(nomProduit.value, quantitesProduit.value, prixAchat.value, prixVente.value, type.value)
    if(isInEditionMode){
        produitList[indexEdition] = newProduit
        //Une fois la modification faite je repasse en mode céation
         isInEditionMode=false;
       
    }else{
     produitList.push(newProduit);
      
    }
    buildHtmlTable()
    resetAllInput()
    closeModalClick()
    }
   

function closeModalClick() {
    closeModal.click()
}


function openModalClick(){

    openModal.click()
}

/*la function buildHtmlTable va me permettre de créer la liste html a partir de l'array produit 
list, l'avantage de cette méthode et que nous n'avons plus besoin de s'occuper de l'html,
on a juste a faire des modifs sur l'array et rappeler cette function 
pour que le changement deviennent visuel et se repercute donc côté html*/
function buildHtmlTable() {

    let newHtml = "";
    produitList.forEach((el,index) => {
        /* if el.quantites>5{
            backgroundrColor:green;
        }
        else{
            backgroundColor:red;
        }*/
     newHtml += ` <tr class="${el.quantites>5?'bg-success':el.quantites>3?'bg-warning':'bg-danger'}">
    <td>${el.nom}</td>
    <td>${el.quantites}</td>
    <td>${el.prixAchatHt}</td>
    <td>${el.prixVenteHt}</td>
    <td>${el.marge}</td>
    <td>${el.prixVenteTtc}</td>
    <td>${el.type}</td>
    <td> <button onclick="modifierStock(${index},'+')" class="btn btn-primary">+</button>
    <button  onclick="modifierStock(${index},'-')" class="btn btn-danger">-</button></td>
    <td> <buttton onclick="supprimer(${index})"  class="btn btn-danger">Delete</button></td>
    <td> <button onclick="Modifier(${index})" class="btn btn-primary">Modifier</button>
    </tr>`
    })
    tBody.innerHTML = newHtml;
    saveArrayInLocalStorage();
}

function modifierStock(index, operator){
// on ne peut pas avoir de quantités négative
if(operator == "-"){
 
    if( produitList[index].quantites>0){
        produitList[index].quantites --;
    }
}
else{
    produitList[index].quantites ++;
}
buildHtmlTable()
}

/*il faut que je fasse une function delete qui 
prendra en parametre l'index de l'element a supprimer.
*/

function supprimer(index){

    produitList.splice(index,1)

    buildHtmlTable()
}

function resetAllInput(){

 nomProduit.value ="";
 quantitesProduit.value =""; 
 prixAchat.value = "";
 prixVente.value = "";
 typeDeproduit.value =""; 
}

/*premiere etape créer la function modifier qui prend en 
parametre un index.
etape 2 la function modifier va open le modal via la function 'openModal'
etape 3 la function modifier va faire remplir les inputs avec les valeurs 
 du produit selectionné.

PROBLEME: quand je vais cliquer sur save 
du modal je vais appeler la function 
save qui est deja codé et qui est faite seulement pour la creation
sa ve dire que la function save doit savoir si on est
 dans un cas d'édition où
de création()*/

/*je fais les variables isInEditionMode et indexEdition pour 
que la function "save()" sache si on doit modifier et si oui a quel index*/
function Modifier(index){
    //on passe en mode édition maintenant
    isInEditionMode=true; 
    indexEdition = index 
openModalClick()

const productToEdit = produitList[index]
//je pré rempli le modal avec les valeurs a modifier
nomProduit.value = productToEdit.nom;
quantitesProduit.value = productToEdit.quantites;
prixAchat.value = productToEdit.prixAchatHt;
prixVente.value = productToEdit.prixVenteHt;
typeDeproduit.value = productToEdit.type;
}

function saveArrayInLocalStorage(){

localStorage.setItem("productList", JSON.stringify(produitList))

}


