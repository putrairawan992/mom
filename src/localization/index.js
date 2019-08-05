import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
  id: {
    modal_undo_title: 'Are you going back / undo to previous process?',
    modal_cancle_tittle: 'Cancle Order',

    // Tab China
    tab_china_need_response: 'Need Response',
    tab_china_need_purchase: 'Need Purchase',
    tab_china_purcahsed: 'Purchased',
    tab_china_ready_to_ship: 'Ready To Ship',
    tab_china_shipped: 'Shipped',

    //Tab Indo
    tab_indo_arrival: 'Arrival',
    tab_indo_ready_to_pickup: 'Ready For Courier To Pick Up',
    tab_indo_pickup_by_courier: 'Picked Up By Courier',
    tab_indo_delivered: 'Delivered To Customer',

    textarea_quote: 'Write some notes here',
    warning_cancel_quote: 'Please write the detail of cancelation',
    warning_undo_quote: 'Please write the detail of undo reason',
    product_cny_quote : 'Original product name from supplier.',
    product_name_quote: 'Product name that will be seen by customers',
    product_description_quote: `Product Descrption helps customer
    understanding the product, it can contain of what material that used
    or anything that related to the product`,
    product_images_quote : 'It required at least one image to create a product, the images should be;',
    delivery_fee_quote: 'Delivery fee (BR) from China to Indonesia',
    add_variant_quote: 'Add variant for the product such as colors, size, materials etc.',
    product_variant_qoute: 'For better visual and performance we recomended that the images should be not out of this requirement',
    measurement_quote: 'Fill all the information on weight and dimension of the product, so the system can calculate the volumetric weight and used the data for shipping and delivery procedure.',
    stock_ready_qoute: 'Turn on the switch if the stock is ready',

    max_image_size: '- Max Img Size 3 Mb',
    min_frame: '- Min Frame Size 450px X 450px',
    format_image: '- Format jpg, jpeg, png',

    //general
    undo: 'Undo',
    reason: "Reason",
    upload: 'Upload',
    cancel_order: 'Cancel Order',
    logout: 'Logout',
    dashboard: 'Dasboard',
    product: 'Product',
    cancel: 'Cancel',
    cancellation_category: 'Cancellation Category',
    order: 'Order',
    order_indonesia: 'Order Indonesia',
    order_time: 'Paid Time',
    customer_note: 'Customer Note',
    respond: 'Respond',
    invoice_no: 'Invoice No. ',
    show_logs: 'Show Logs',
    purchased_time: 'Purchased Time',
    ready_time: 'Ready Time',
    shipped_time: 'Shipped Time',
    its_way_to_indonesia: 'On its way to Indonesia',
    arrived_in_indonesia: 'Arrived in Indonesia',
    kg: 'Kg',
    cm: 'cm',

    create_product: 'Create Product',
    supplier_info: 'Supplier Info',
    supplier: 'Supplier',
    required: 'Required',
    product_information: 'Product Information',
    product_name_cny: 'Product Name (CNY)',
    product_name: 'Product Name',
    product_description: 'Product Description',
    product_images: 'Product Images',
    product_price: 'Product Price',
    product_variant: 'Product Variant',
    product_fragile: 'Product Is Fragile',
    base_price: 'Base Price',
    domestic_fee: 'Domestic Fee',
    shipment_fee: 'Shipment Fee',
    images: 'Images',
    category: 'category',
    by_sea: 'By Sea',
    by_air: 'By Air',
    shipment_price_reference:'Shipment Price Refrences',
    administration: 'Adminitstration',
    exchange_rate: 'Exchange Rate',
    price_by_sea: 'Price By Sea',
    price_by_air: 'Price By Air',
    add_variant_type: 'Add Variant Type',
    variant_type: 'Variant Type',
    add_variant_name: 'Add Variant Name',
    measurement: 'Measurement',
    actual_weight: 'Actual Weight',
    dimension: 'Dimension',
    volumetric_weight: 'Volumetric Weight',
    stock_management: 'Stock Management',
    max_qty: 'Maximum Qty / Order',
    ready_stock: 'Ready Stock',


    placeholder_supplier: 'Choose Supplier',
    placeholder_weight: 'Weight',
    placeholder_width: 'Width',
    placeholder_length: 'Length',
    placeholder_height: 'Height',

    type_image_error: 'Only JPG, PNG, JPEG',
    size_image_error: 'Max Size 3Mb',
    frame_image_error: 'Min Frame Size 450 X 450',
    supplier_error: 'Supplier is Required',
    variant_item_error: 'You have to fill the variant information before creating product.',
    product_error: 'Product name is required',
    category_error: 'Category is required',
    base_price_error: 'Base price is required',
    domestic_error: 'Domestic fee price is required.',
    shipment_sea_error: 'Shipment fee by sea is required.',
    shimpet_air_error: 'Shipment fee by air is required',
    upload_image_error: 'You have to upload at least one image to create product.',
    actual_weight_error: 'Actual Weight is required',
    dimension_measurement_errro: 'Please fill all required measurement to calculate volumetric weight.',
    quantity_error: 'Quantity is required'

    




  }
})

export default strings