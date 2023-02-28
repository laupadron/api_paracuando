/**
 * @openapi
 * paths:
 *   /api/v1/tags:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Get Filtered Tags
 *       tags:
 *         - [Tags]
 *       parameters:
 *         - name: name
 *           in: query
 *           required: false
 *           schema:
 *             type: string
 *             minimun: 1
 *           description: Tag name
 *         - name: description
 *           in: query
 *           required: false
 *           schema:
 *             type: string
 *             minimun: 1
 *           description: Tag description
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: string
 *                     example: {"count":5,"totalPages":1,"currentPages":1}
 *                   results:
 *                     type: array
 *                     $ref: '#/components/schema/tagsBody'
 *         400:
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found / something wrong
 *     post:
 *       security:
 *         - bearerAuth: []
 *       summary: Add a Tag (Available only for administrators)
 *       tags:
 *         - [Tags]
 *       requestBody:
 *         description: Fields required to create a publication 
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/tagsAdd'
 *       responses:
 *         201:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: {"message": "Tags Added"}
 *         400:
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found / something wrong
 *   /api/v1/tags/{id}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Get Detail Tags
 *       tags:
 *         - [Tags]
 *       parameters:
 *         - name: id
 *           in: path
 *           type: integer
 *           required: true
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: string
 *                     example: {"count":5,"totalPages":1,"currentPages":1}
 *                   results:
 *                     type: array
 *                     $ref: '#/components/schema/tagsBody'
 *         400:
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found / something wrong
 *     put:
 *       security:
 *         - bearerAuth: []
 *       summary: Update Tags (Available only for administrators)
 *       tags:
 *         - [Tags]
 *       parameters:
 *         - name: id
 *           in: path
 *           type: integer
 *           required: true
 *       requestBody:
 *         description: Fields required to update a tag 
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/tagsAdd'
 *       responses:
 *         201:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: {"message": "Succes Update"}
 *         400:
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found / something wrong
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       summary: Update Tags (Available only for administrators)
 *       tags:
 *         - [Tags]
 *       parameters:
 *         - name: id
 *           in: path
 *           type: integer
 *           required: true
 *       responses:
 *         201:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: {"message": "Tag Removed"}
 *         400:
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found / something wrong
 */ 