import { useState, useEffect } from 'react';
import Category from '../../repository/Category';

export default function ProductInfoContainer (props){
  const [allCategory,setAllCategory] = useState([])
 
  useEffect(() => {
    getAllCategory();
  },[])

  function convertCategoryToSchemaInput(response) {
    let allCategory = response;
    allCategory.forEach((respSub) => {
      if(respSub.categorySubResponses){
        respSub.children = respSub.categorySubResponses
        respSub.categorySubResponses.forEach((resp) => {
          resp.children = resp.categorySubChildResponses
        })
      }
    })
    return allCategory;
  }
  
  const filter = (inputValue, path) => {
    return path.some(option => option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  async function getAllCategory() {
    const allCategoryResp = await Category.getAll();

    if(allCategoryResp.status === 200) {
      const allCategory = convertCategoryToSchemaInput(allCategoryResp.data.data);
      setAllCategory(allCategory);
    } else {
      setAllCategory([]);
    }
  }

  return props.children({
    filter, allCategory
  })
}