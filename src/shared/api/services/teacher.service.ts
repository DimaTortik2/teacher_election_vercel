import { QUERY_KEYS } from '../../model/constants'
import { InfinityResponce } from '../../model/interfaces/infinity.interface'
import { ITeacherForm } from '../../model/interfaces/teacher-form.interface'
import type {
	ITeachersResponse,
	ICreateTeacher,
	ITeacherExtended,
} from '../../model/interfaces/teacher.interface'
import { instance } from '../api.instance'

export const teacherService = {
	axios: instance,

	createOne: async function (data: ITeacherForm): Promise<ICreateTeacher> {
		const formData = new FormData()
		formData.append('subjectId', JSON.parse(data.subject).subjectId)
		formData.append('photo', data.photo[0])
		formData.append('fullName', data.fullName)

		console.log(
			' data.photo',
			typeof data.photo,
			'data.fullName',
			typeof data.fullName
		)

		return await this.axios
			.post(`/${QUERY_KEYS.teacher}`, formData)
			.then(res => res.data)
	},

	findOne: async function (id?: string): Promise<ITeacherExtended> {
		return this.axios.get(`/${QUERY_KEYS.teacher}/${id}`).then(res => res.data)
	},

	findMany: async function (
		cursor: string
	): InfinityResponce<ITeachersResponse> {
		const params = new URLSearchParams()
		if (cursor) {
			params.append('cursor', cursor)
		}
		return await this.axios
			.get(`/${QUERY_KEYS.teacher}?${params.toString()}&limit=5`)
			.then(res => res.data)
	},

	deleteOne: async function (id: string): Promise<void> {
		return await this.axios.delete(`/${QUERY_KEYS.teacher}/${id}`)
	},

	editOne: async function (id: string): Promise<void> {
		return await this.axios.put(`/${QUERY_KEYS.teacher}/${id}`)
		//////////////////////////
	},
}
