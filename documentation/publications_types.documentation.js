/**
 * @openapi
 * /api/v1/publications-types:
 *   get:
 *     summary: Get all or filtered publications-types
 *     description: You can filter the types of publications based on their fields. No login required.
 *     tags:
 *       - [Publications-Types]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimun: 1
 *         description: Publication Type id
 *       - name: name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: Publication Type name
 *       - name: description
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: Publication Type description
 *       - name: created_at
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: Publication Type created_at
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
 *                   items:
 *                     $ref: '#/components/schema/publicationType'
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
 * /api/v1/publications-types/{id}:
 *   get:
 *     summary: Get Publications-type by id
 *     description: Get Detail Publications-types. Login required.
 *     tags:
 *       - [Publications-Types]
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
 *                 result:
 *                   type: string
 *                   $ref: '#/components/schema/publicationType'
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
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update Publications-types
 *     description: Update Publications-types. Only Administrator. Login required
 *     tags:
 *       - [Publications-Types]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *     requestBody:
 *       description: Fields required to update a publication_type (Available only for administrators)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/updatePublicationType'
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
 *                   example: {"message": "Succes Update"}
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