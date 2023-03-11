/**
 * @openapi
 * /api/v1/publications:
 *   get:
 *     summary: Get all or filtered Publications
 *     description: Publications can be filtered based on all their fields, their associated Tags and/or their votes. Not login required.
 *     tags:
 *       - [Publications]
 *     parameters:
 *       - name: publications_types_id
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: publications_types_id
 *       - name: title
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: Publication title
 *       - name: description
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: Publication description
 *       - name: tags_id
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: Publication tags_id
 *       - name: created_at
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: Publication created_at
 *       - name: votes_count
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimun: 1
 *         description: Publication votes_count
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: {"count":5,"totalPages":1,"currentPages":1}
 *                 results:
 *                   type: array
 *                   $ref: '#/components/schema/publicationsUser'
 *                 belongs to:
 *                   type: object
 *                   $ref: '#/components/schema/updateUser'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                   description: numero de pagina actual
 *                 pageCount:
 *                   type: integer
 *                   example: 10
 *                   description: numero total de paginas
 *                 totalCount:
 *                   type: integer
 *                   example: 100
 *                   description: numero total de objeros de la lista
 *             headers:
 *               x-pagination:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     first:
 *                       type: string
 *                       example: https://api.example.com/items?page=1
 *                       description: URL de la primera página
 *                     last:
 *                       type: string
 *                       example: https://api.example.com/items?page=10
 *                       description: URL de la última página
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
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a Publication
 *     description: Creates a Publication. Vote is assigned automatically and also the tags associated with the publication. Login required.
 *     tags:
 *       - [Publications]
 *     requestBody:
 *       description: Fields required to create a publication 
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/createPublication'
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
 *                   example: {"message": "Publication Add"}
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
 * /api/v1/publications/{id}:
 *   get:
 *     summary: Get Detail Publication by id
 *     description: Get Detail Publications. Need id publication on path. Not login required. 
 *     tags:
 *       - [Publications]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: {"count":5,"totalPages":1,"currentPages":1}
 *                 results:
 *                   type: array
 *                   $ref: '#/components/schema/publicationsUser'
 *                 belongs to:
 *                   type: object
 *                   $ref: '#/components/schema/updateUser'
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
 *   delete:
 *     summary: Delete a publication
 *     description: Deletes a publication with its id on path.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - [Publications]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
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
 *                   example: {"message": "Publication Removed"}
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
 * /api/v1/publications/{id}/vote:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add / remove a vote
 *     description: Can add a vote on a publication or remove it. Only logged in users.
 *     tags:
 *       - [Publications]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
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
 *                   example: {"message": "Vote Add/Vote Removed"}
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
 * /api/v1/publications/{id}/add-image:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add an image for a publication
 *     description: Adds an image in Publication. Just up to three images with a maximum weight of 524288 | 0.5 Mb. Administrator and Owner user only. Login required.
 *     tags:
 *       - [Publications]
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
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
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
 *                   example: {"message": "image added"}
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
 * /api/v1/publications/{id}/remove-image/{order}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete an image in Publication
 *     description: The id of the publication and the order number of the image must be sent. Only Owner user logged in or administrator.
 *     tags:
 *       - [Publications]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *       - name: order
 *         in: path
 *         type: integer
 *         description: de order's image
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: {"message": "image Remove"}
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
 * /api/v1/publications/{id}/image-order:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Change image order in Publication
 *     description: The image with the actual_order (must exists) selected will change places with the next_order image (if it exists, no required). Only owner user or administrator. Login required.
 *     tags:
 *       - [Publications]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *     requestBody:
 *       description: Field required to change order's image
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {"actual_order":1,"next_order":2}
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
 *                   example: {"message": "change order"}
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