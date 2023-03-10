/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get users / Only for users with the Administrator role/ You can filter users based on their fields
 *     tags:
 *       - [Users]
 *     parameters:
 *       - name: first_name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: User first_name
 *       - name: last_name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: User User last_name
 *       - name: email
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: email
 *       - name: username
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: User username
 *       - name: created_at
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: User created_at
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
 *                   $ref: '#/components/schema/responseMe'
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
 * /api/v1/users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get public information about user/ If the user looks at their own profile, they will be shown more complete fields
 *     tags:
 *       - [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *                   $ref: '#/components/schema/responseMe'
 *                 tags:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schema/tagsUser'
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
 *     summary: The user will be able to edit their data/ Only the same user can change their profile
 *     tags:
 *       - [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *     requestBody:
 *       description: Fields required to update a user 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/updateUser'
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
 * /api/v1/users/{id}/votes:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Shows the votes made by the users
 *     tags:
 *       - [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *                     $ref: '#/components/schema/votesUser'
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
 * /api/v1/users/{id}/publications:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: You can see the publications made by users/ It has options to filter by publication fields
 *     tags:
 *       - [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: title
 *         type: string
 *         required: false

 *       - in: query
 *         name: user_id
 *         type: string
 *         required: false
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
 *                     $ref: '#/components/schema/publicationsUser'
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
 * /api/v1/users/{id}/add-interest:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add interest to user /The user will send the tag_id that will be used to mark their interest/ Only the same user can do it
 *     tags:
 *       - [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       description: Field required to add a tag
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {"tag_id": 2}
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
 *                   example: {"message": "Interest Added"}
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
 * /api/v1/users/{id}/remove-interest:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete user interest/ The user will send the tag_id that will be used to remove their interest/Only the same user can do it
 *     tags:
 *       - [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       description: Field required to delete a tag
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {"tag_id": 2}
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
 *                   example: {"message": "Interest Removed"}
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
 * /api/v1/users/{id}/add-image:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add an image in users /The user will send an image that will be saved in their profile / Only the same user can do it
 *     tags:
 *       - [Users]
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
 * /api/v1/users/{id}/remove-image:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete an image in users/The user will have the option to delete the image of his profile / Administrator and the user himself can do it
 *     tags:
 *       - [Users]
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
 */