/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all or filtered users
 *     description: Only for users Admins role, you can filter users based on their fields. Need to be logged.
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
 *         description: User last_name
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
 *                   example: {"count":5,"totalPages":1,"currentPage":1}
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
 *     summary: Get user by ID
 *     description: Get public information from a user, if the user looks at its own profile, they will be shown more complete fields. Need to be logged.
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
 *                 interests:
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
 *     summary: Update user
 *     description: The user will be able to edit their data. Only the same user can change their profile. Need to be logged.
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
 *     summary: Get user votes
 *     description: It shows the votes made by a specific user with its ID. Need to be logged.
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
 *                   example: {"count":5,"totalPages":1,"currentPage":1}
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
 *     summary: Get a list of publications for a user
 *     description: You can see the publications made by users. Also it has options to filter by publication fields. Need to be logged.
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
 *                   example: {"count":5,"totalPages":1,"currentPage":1}
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
 *     summary: Add interest to user 
 *     description: The user will send the tag_id that will be used to mark their interest. Only the same user can do it. Need to be logged.
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
 *     summary: Delete user interest
 *     description: The user will send the tag_id that is used to remove their interest. Only the same user is able to do it. Need to be logged.
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
 *     summary: Add an image for a user
 *     description: The user will upload an image (5mb max) to their profile using the user ID in path . Only the same user and admin can do it. Need to be logged. 
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
 *     summary: Delete an image in users
 *     description: The user will have the option to delete the image of its profile. Administrator and the user himself can do it. Need to be logged. 
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