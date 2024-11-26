export interface Form {
    id: string;
    title: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface FormField {
    id: string;
    form_id: string;
    label: string;
    field_type: "text" | "radio" | "checkbox" | "dropdown";
    is_required: boolean;
    options?: string[];
    created_at: Date;
    updated_at: Date;
  }
  
  export interface FormResponse {
    id: string;
    form_id: string;
    answers: { field_id: string; value: string }[];
    submitted_at: Date;
  }
  