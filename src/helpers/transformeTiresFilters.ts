interface InputItem {
    _count: { tireWidth: number; tireAspectRatio: number, rimDiameter: number; marka: number, stock: number };
    tireWidth: number;
    tireAspectRatio: number;
    rimDiameter: number;
    marka: number | string;
    stock: number;
  }
  
  interface OutputItem {
    count: number;
    tireWidth?: number;
    tireAspectRatio?: number;
    rimDiameter?: number;
    marka?: any;
    stock?: number;
  }
  
  interface TransformResult {
    tireWidth: OutputItem[];
    tireAspectRatio: OutputItem[];
    rimDiameter: OutputItem[];
    marka: OutputItem[];
    stock: OutputItem[];
  }
  
  type UpdateResultKey = 'tireWidth' | 'tireAspectRatio' | 'rimDiameter' | 'marka' | 'stock';
  
  export const TransformeTiresFilters = (inputArray: InputItem[]): TransformResult => {
    const result: TransformResult = { tireWidth: [], tireAspectRatio: [], rimDiameter: [], marka: [], stock: [] };
  
    const updateResult = (key: UpdateResultKey, count: number, value?: number | string) => {
      const entry = result[key].find(
        (entry) => (value === undefined ? entry.count : entry[key]) === value
      );
      if (entry) {
        entry.count += count;
      } else {
        const newItem: OutputItem = { count };
        if (value !== undefined) {
          newItem[key] = value;
        }
        result[key].push(newItem);
      }
    };
  
    inputArray.forEach(({_count, tireWidth, tireAspectRatio, rimDiameter, marka, stock }) => {
      updateResult('tireWidth', _count.tireWidth, tireWidth);
      updateResult('tireAspectRatio', _count.tireAspectRatio, tireAspectRatio);
      updateResult('rimDiameter', _count.rimDiameter, rimDiameter);
      updateResult('marka', _count.marka, marka);
      updateResult('stock', _count.stock, stock);
    });
  
    return result;
  };
  