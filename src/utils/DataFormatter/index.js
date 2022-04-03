export const jsonToRequired =(data)=>{
  const response = getTwoArrayWithDifferentIdNumber(data);
  const requiredDataFormat = getOneRecipeCategoryData(response.elmOne,response.elmTwo);
  return requiredDataFormat
}

export const getTwoArrayWithDifferentIdNumber = (data) => {
  const elmOne =[];
  const elmTwo = [];
  for (let index = 0; index < data?.length; index++) {
      if(data[index].RecipeCategoryId === 4 ){
              elmOne.push(data[index])
      }
      else{
        elmTwo.push(data[index])
      }
    }
    return {elmOne,elmTwo};
}

const getOneRecipeCategoryData = (data,elmTwo) => {
  const ingredientOne = [];
  const ingredientTwo = [];
  const ingredientThree=[];
  const ingredientFour=[];
  data?.map(object => {
    if(object?.IngredientId === 191){
      ingredientOne.push(object)  
    }
    else if(object?.IngredientId === 192){
      ingredientTwo.push(object)
    }
    else if(object?.IngredientId === 193){
      ingredientThree.push(object)
    }
    else{
      ingredientFour.push(object)
    }
  }) 
  const res1 = generateRequireResponseToTable(ingredientOne)
  const res2 = generateRequireResponseToTable(ingredientTwo)
  const res3 = generateRequireResponseToTable(ingredientThree)
  const res4= generateRequireResponseToTable(ingredientFour)
  const elmTwoRes = generateRequireResponseToTable(elmTwo)
  return [res1,res2,res3,res4,elmTwoRes]
  
}

const generateRequireResponseToTable = (singleArray) =>{
  const arrayOfData = singleArray.map(object=>{
    return { 
      "BiologicalHazardId":object.BiologicalHazardId,
        "Status": object.Status,
        "IsExists": object.IsExists,
        "BiologicalHazardTitle": object.BiologicalHazardTitle
    }
  })
  return {
        "IngredientId": singleArray[0].IngredientId,
        "IngredientName": singleArray[0].IngredientName,
        "RecipeCategoryId": singleArray[0].RecipeCategoryId,
        "CategoryTitle": singleArray[0].CategoryTitle,
        "RecipeSubCategoryTitle": singleArray[0].RecipeSubCategoryTitle,
        "BiologicalHazard": [
          ...arrayOfData
        ]
  }

}