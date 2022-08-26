<template>
  <div class="container m-5">
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header p-3">
            Daftar Pengguna
            <div class="float-end">
              <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#formModal">Buat Pengguna</button>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <th class="text-center">ID</th>
                  <th class="text-center">Name</th>
                  <th class="text-center">Email</th>
                  <th class="text-center">Gender</th>
                  <th class="text-center">Status</th>
                  <th class="text-center">Action</th>
                </thead>
                <tbody>
                  <tr v-for="(user) in users" v-bind:key="user">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.gender }}</td>
                    <td>{{ user.status }}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#detail" @click="showModalDetail(`${user.id}`)">View</button>
                      <button class="btn btn-sm btn-warning mx-2">Update</button>
                      <button class="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="footer">
            <paginate
              :page-count="20"
              :page-range="3"
              :margin-pages="2"
              :click-handler="fetchPaginate"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination'"
              :page-class="'page-item'"
            >
            </paginate>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Modal -->
    <div class="modal fade" id="detail" tabindex="-1" aria-labelledby="detailLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailLabel">Detail Pengguna</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table>
              <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{{ user.name }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>:</td>
                <td>{{ user.gender }}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>:</td>
                <td>{{ user.status }}</td>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="formModal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="formModalLabel">Pengguna</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="form-group">
                <label>Nama</label>
                <input type="text" v-model="form.name" class="form-control">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="form.email" class="form-control">
              </div>
              <div class="form-group">
                <label>Gender</label>
                <select v-model="form.gender" class="form-control">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div class="form-group">
                <label>Status</label>
                <select v-model="form.status" class="form-control">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="savePengguna">Save</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import Paginate from 'vuejs-paginate-next'

export default {
  name: 'UserPage',
  components: {
    paginate: Paginate,
  },
  data() {
    return {
      users: [],
      url: 'https://gorest.co.in/public/v2',
      token: '2634bb1d4083fd37522aabd20e7a9b91c2ae6b2ac28e8c108e6a9eb344aabee8',
      pages: {
        page: 1
      },
      modal:{
        show: false,
      },
      form: {
        name: 'test',
        email: 'test@gmail.com',
        gender: 'male',
        status: 'active',
      },
      user: {
        name: null,
        email: null,
        gender: null,
        status: null,
      },
      genders: [
        {
          value: 'male',
          text: 'Male',
        },
        {
          value: 'female',
          text: 'Female',
        }
      ]
    }
  },
  created(){
    console.log('test', process.env)
    this.getUsers()
  },
  methods:{
    async getUsers(){
      const res = await axios.get(`${this.url}/users?page=${this.pages.page}`,
        {
          'headers':
          { 
            'Authorization': `Bearer ${this.token}`
          }
        })
      this.users = res.data
    },
    async getDetailUser(id){
      const res = await axios.get(`${this.url}/users/${id}`,
        {
          'headers':
          { 
            'Authorization': `Bearer ${this.token}`
          }
        })
      console.log('res', res.data)
      this.user = res.data
    },
    fetchPaginate(page) {
      console.log(page)
      this.pages.page = page
      this.getUsers()
    },
    showModalDetail(id){
      this.getDetailUser(id)
    },
    async savePengguna(){
      const payload = this.form
      
      await axios.post(`${this.url}/users`,
        payload,
        {
          'headers':
          { 
            'Authorization': `Bearer ${this.token}`
          }
        }
      )
      this.fetchPaginate(this.pages.page)
    }
  }
}
</script>