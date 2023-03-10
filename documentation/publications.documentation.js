/**
 * @openapi
 * /api/v1/publications:
 *   get:
 *     summary: Get Publications/ Publications can be filtered based on all their fields, their associated Tags and/or their votes
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
 *     summary: Create a Publication/ A vote is assigned automatically and also the tags associated with the publication / Only for logged in users
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
 *     summary: Get Detail Publications
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
 *     summary: Delet a publication
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
 *     summary: Can vote on a publication or remove the vote from the publication / Only logged in user
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
 *     summary: Add an image in Publication/ Up to three images with a maximum weight of 524288 | 0.5 Mb/ Administrator and logged in user only
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
 *     summary: Delete an image in Publication/ The id of the publication and the order number of the image must be sent / Only user logged in or with administrator role
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
 *     summary: change order in Publication/ The image with the actual_order (if it exists) selected will change places with the next_order image (if it exists) / Only user logged in or with administrator role
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