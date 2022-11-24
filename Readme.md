# Backend API for 'Placement Management System'

## Major router for this API,
- `/api/v1/auth`
- `/api/v1/admin`
- `/api/v1/company`

### Auth Route
Using this route you can either check for login or signup for admin,

1. For Login,
    Route -> `/api/v1/auth/login`
    Method -> **POST**
    Request -> {'email': value, 'password': value}
    Response -> {'user': value | null, 'message': response message}

2. For Signup,
    Route -> `/api/v1/auth/login`
    Method -> **POST**
    Request -> {'name': value, 'email': value, 'password': value}
    Response -> {'user': value | null, 'message': response message}

### Admin Route
At now using this route only deletion of admin is allowed,

1. To Delete Admin,
    Route -> `/api/v1/admin/:id`
    Method -> **DELETE**
    Request -> Nil
    Response -> {'success': true | false, 'message': response message}

### Company Route
From here you can *Get, Post, Put, Delete* opertaion can be perfomed on Companies database

1. To Get All Companies,
    Route -> `/api/v1/company/`
    Method -> **GET**
    Request -> Nil
    Response -> {'companies': true | false, 'message': response message}

2. To Get Company by type,
    ==Note: Type should be ['core', 'software']==
    Route -> `/api/v1/company/:type`
    Method -> **GET**
    Request -> Nil
    Response -> {'companies': true | false, 'message': response message}

3. To add a new Company,
    Route -> `/api/v1/company/`
    Method -> **POST**
    Request -> {'company_name': value, 'company_type': value, 'company_description': value, 
               'alumni': [value]}
                `alumni value should be as [{'name': value, 'phone': value, 'batch': value, 'email': value}]`
    Response -> {'company': value | null, 'message': response message}

4. To update alumni in Company,
    Route -> `/api/v1/company/:id`
    Method -> **PUT**
    Request -> {'company_name': value, 'company_type': value, 'company_description': value, 
               'alumni': [value]}
                `alumni value should be as [{'name': value, 'phone': value, 'batch': value, 'email': value}]`
    Response -> {'company': value | null, 'message': response message}

5. To Delete Company,
    Route -> `/api/v1/company/:id`
    Method -> **DELETE**
    Request -> Nil
    Response -> {'success': true | false,'company' : value, 'message': response message}