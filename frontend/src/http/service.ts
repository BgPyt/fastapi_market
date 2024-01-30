import { EnumTypeItem } from "@type/enum";
import { $host } from ".";
import { IcategoryParams } from "@type/types";

class CategoryAPI {
    static async fetchCategories() {
        const result = await $host.get('api/categoryAll')
        return result.data
    }
    static async fetchSubcategories(category_name: string) {
        const result = await $host.get('api/search/menu-2', {
            params: {
                category_name: category_name
            }})
            
        return result
    }
    static async fetchSubcategoryFilter(parameters: object) {
        const result = await $host.get('api/subcategories_filter', {
            params: {filter_slug: Object.values(parameters).join('/')}
        })
        return result
    }
}


class ProductAPI {
    static async fetchTypeProducts(type: EnumTypeItem) {
        const result = await $host.get('api/type-products', {
            params: {
                type_product: type
            }
        })
        return result.data
    }
    static async fetchProductsfilter(parameters: object) {
        const result = await $host.get('api/products_filter', {
            params: {filter_slug: Object.values(parameters).join('/')}
        })
        return result
        
    }
}

export {CategoryAPI, ProductAPI}