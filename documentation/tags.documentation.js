/**
 * @openapi
 * paths:
 *   /api/v1/tags:
 *     get:
 *       summary: Get all or filtered Filtered Tags
 *       description: Get all or filtered Filtered Tags. No login required.
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
 *       summary: Add a Tag
 *       description: Add a Tag. Only administrators. Login required.
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
 *       summary: Get tag by id
 *       description: Get Detail Tags. Logged in user only.
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
 *       summary: Update Tags 
 *       description: Updates Tags by its id. Available only for administrators.
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
 *       summary: Delete Tags 
 *       description: Deletes Tags by its id. Available only for administrators.
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
 * /api/v1/tags/{id}/add-image:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add an image in Tags
 *     description: Adds an image in Tags. Available only for administrators
 *     tags:
 *       - [Tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: {"message": "image added", "image": "https://paracuando.s3.sa-east-1.amazonaws.com/tag-image-9-71f5e94e-b035-46d6-a7e3-1cbc0481cd84?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZPEQWT3PYDA672WW%2F20230310%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230310T232812Z&X-Amz-Expires=518400&X-Amz-Signature=04ab7ddd2ed9b5c9bcf78e342d671429ee00b2ae4208b25f7d86b8ffd07e73bd&X-Amz-SignedHeaders=host&x-id=GetObject"}
 *       400:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: not found / something wrong
 */ 