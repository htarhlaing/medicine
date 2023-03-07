declare module MedicineInfo {

    export interface Medicine {
        id: string;
        name: string;
        desc: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        medicineCategoryId?: any;
    }

    export interface Page {
        list: Medicine[];
        current: number;
        pageSize: number;
        total: number;
    }
 
    export interface Info {
        data: Data;
        success: boolean;
        errorMessage: string;
    }

}

